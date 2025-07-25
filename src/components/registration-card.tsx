
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
  });
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
      cashCollectorName: "",
    },
  });

  const paymentMode = form.watch("paymentMode");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (values.paymentMode === "Online") {
      router.push("/pay-now");
    } else {
      toast({
        title: "Form Submitted",
        description: `Your ${type} registration has been received.`,
      });
      form.reset();
    }
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

              {paymentMode === "Online" && (
                <div className="p-4 text-center text-muted-foreground border border-dashed rounded-md">
                  Proceed to pay online.
                </div>
              )}
            </div>
            
            <div className="mt-6">
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
