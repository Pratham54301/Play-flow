
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from 'next/image';
import Link from "next/link";

interface RegistrationCardProps {
  type: "Solo" | "Duo" | "Squad";
}

const generatePlayerSchema = () => z.object({
  uid: z.string().min(1, { message: "UID is required." }),
  name: z.string().min(1, { message: "In-game name is required." }),
});

const generateFormSchema = (type: "Solo" | "Duo" | "Squad") => {
  let playersSchema;
  if (type === "Solo") {
    playersSchema = z.array(generatePlayerSchema()).length(1);
  } else if (type === "Duo") {
    playersSchema = z.array(generatePlayerSchema()).length(2);
  } else { // Squad
    playersSchema = z.array(generatePlayerSchema()).length(4);
  }

  return z.object({
    players: playersSchema,
    fullName: z.string().min(1, { message: "Full name is required." }),
    upiId: z.string().min(1, { message: "UPI ID is required." }),
    paymentMode: z.enum(["Cash", "Online"]),
    cashCollectorName: z.string().optional(),
    screenshot: z.any().optional(),
  }).refine(data => {
    if (data.paymentMode === 'Cash' && !data.cashCollectorName) {
      return false;
    }
    return true;
  }, {
    message: "Please select a cash collector.",
    path: ["cashCollectorName"],
  }).refine(data => {
    if (data.paymentMode === 'Online' && !data.screenshot) {
        return false;
    }
    return true;
  }, {
    message: "Please upload a payment screenshot.",
    path: ["screenshot"],
  });
};

type PaymentDetail = {
    amount: number;
    upiId: string;
    qr: string;
};

export default function RegistrationCard({ type }: RegistrationCardProps) {
  const { toast } = useToast();
  const router = useRouter();
  const formSchema = generateFormSchema(type);
  const playerCount = type === "Solo" ? 1 : type === "Duo" ? 2 : 4;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      players: Array.from({ length: playerCount }, () => ({ uid: "", name: "" })),
      fullName: "",
      upiId: "",
      paymentMode: "Online",
    },
  });

  const paymentMode = form.watch("paymentMode");
  
  const paymentDetails: Record<"Solo" | "Duo" | "Squad", PaymentDetail> = {
    Solo: {
        amount: 30,
        upiId: '7777967668@upi',
        qr: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=7777967668@upi&pn=prathamkumar=30&cu=INR'
    },
    Duo: {
        amount: 60,
        upiId: 'jayrajsinhchauhan999-1@okicici',
        qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=jayrajsinhchauhan999-1@okicici&pn=Jayraj&am=60&cu=INR`
    },
    Squad: {
        amount: 100,
        upiId: 'jayrajsinhchauhan999-1@okicici',
        qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=jayrajsinhchauhan999-1@okicici&pn=Jayraj&am=100&cu=INR`
    },
  };

  const currentPayment = paymentDetails[type];
  const upiLink = `upi://pay?pa=${currentPayment.upiId}&pn=Jayraj&am=${currentPayment.amount}&cu=INR`;


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast({
        title: "Form Submitted",
        description: `Your ${type} registration has been received.`,
    });
    form.reset();
  }

  return (
    <Card className="w-full bg-secondary/50 border-border flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{type} Registration</CardTitle>
        <CardDescription>
          Fill out the form to register your {type === "Solo" ? "entry" : "team"}.
        </CardDescription>
      </CardHeader>
  
      <CardContent className="flex-grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="space-y-6 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: playerCount }).map((_, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <h4 className="font-semibold text-foreground">Player {index + 1}</h4>
                    <FormField
                      control={form.control}
                      name={`players.${index}.uid`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Game UID</FormLabel>
                          <FormControl>
                            <Input placeholder={`Player ${index + 1} UID`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`players.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>In-game Name</FormLabel>
                          <FormControl>
                            <Input placeholder={`Player ${index + 1} Name`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your UPI ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your UPI ID for rewards" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="paymentMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Payment Mode</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a payment mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                {paymentMode === "Cash" && (
                  <FormField
                    control={form.control}
                    name="cashCollectorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Cash Collector</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a name" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Pratham">Pratham</SelectItem>
                            <SelectItem value="Jayraj Sinh">Jayraj Sinh</SelectItem>
                            <SelectItem value="Devsinh">Devsinh</SelectItem>
                            <SelectItem value="Umesh">Umesh</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
  
              {paymentMode === "Online" && (
                <div className="pt-6 space-y-4">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Button asChild>
                        <Link href={upiLink}>
                          🔗 Pay ₹{currentPayment.amount} via UPI (opens UPI app)
                        </Link>
                    </Button>
                  </div>

                  <FormField
                      control={form.control}
                      name="screenshot"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Add Screenshot</FormLabel>
                          <FormControl>
                              <Input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                              />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                  />
                </div>
              )}
            </div>
  
            <div className="mt-8">
              <Button type="submit" className="w-full font-bold">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
