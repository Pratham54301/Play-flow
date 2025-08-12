export async function getLeaderboard(_req, res) {
  // Placeholder data for leaderboard
  const solo = [
    { rank: 1, name: "ShadowStriker", points: 4500 },
    { rank: 2, name: "Viper", points: 4300 },
  ];
  const duo = [
    { rank: 1, name: "Thunder & Bolt", points: 5200 },
    { rank: 2, name: "Fire & Ice", points: 4900 },
  ];
  const squad = [
    { rank: 1, name: "The Titans", points: 6000 },
    { rank: 2, name: "Apex Predators", points: 5700 },
  ];
  res.json({ solo, duo, squad });
}