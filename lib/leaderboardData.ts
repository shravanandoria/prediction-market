// Demo data for 40 users in the leaderboard
export interface LeaderboardUser {
  id: number;
  username: string;
  avatar: string;
  profitLoss: number;
  volume: number;
}

export interface BiggestWin {
  id: number;
  username: string;
  avatar: string;
  matchName: string;
  betAmount: number;
  winAmount: number;
}

// Generate random gradient colors for avatars
const generateAvatarGradient = (seed: number): string => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f77062 0%, #fe5196 100%)',
    'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
    'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)',
    'linear-gradient(135deg, #feada6 0%, #f5efef 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  ];
  return gradients[seed % gradients.length];
};

// Generate usernames
const usernames = [
  'kch123',
  '432614799197',
  '0x006cc834Cc092684F1B56626E23BEdB3835c16ea',
  'gopatriots',
  'gmanas',
  'MCgenius',
  'beachboy4',
  'cryptoking',
  'tradewizard',
  'betmaster',
  'luckystreak',
  'profitpro',
  'moonshot',
  'diamondhands',
  'bullrunner',
  'smartbetter',
  'alphatrader',
  'whalealert',
  'rocketman',
  'goldminer',
  'fortunehunter',
  'cashcow',
  'moneymaker',
  'bigwinner',
  'sharpshooter',
  'aceventura',
  'kingkong',
  'tigershark',
  'eagleeye',
  'lionheart',
  'wolfpack',
  'bearmarket',
  'bullseye',
  'jackpot',
  'hattrick',
  'grandslam',
  'homerun',
  'touchdown',
  'knockout',
  'champion',
];

export const leaderboardData: LeaderboardUser[] = Array.from({ length: 40 }, (_, i) => {
  const baseProfit = 6000000 - (i * 140000);
  const randomVariation = Math.random() * 50000 - 25000;
  const profitLoss = Math.floor(baseProfit + randomVariation);
  
  const baseVolume = 100000000 - (i * 2000000);
  const volumeVariation = Math.random() * 1000000 - 500000;
  const volume = Math.floor(baseVolume + volumeVariation);

  return {
    id: i + 1,
    username: usernames[i],
    avatar: generateAvatarGradient(i),
    profitLoss,
    volume,
  };
});

// Biggest wins data
const matchNames = [
  'Real Sociedad de Fútbol vs. Athletic Club',
  'Tottenham Hotspur F.C. vs. Arsenal F.C.',
  'Olympique de Marseille vs. Paris Saint-Germain',
  'Olympiakós SFP vs. PAOK FC',
  'Juventus FC vs. Sport Club Internacional',
  'RC Celta de Vigo vs. Levante UD',
  'Juventus FC vs. SSC Napoli',
  'Sunderland AFC vs. Chelsea F.C.',
  'Manchester United vs. Liverpool FC',
  'FC Barcelona vs. Real Madrid CF',
  'Bayern Munich vs. Borussia Dortmund',
  'AC Milan vs. Inter Milan',
  'AS Roma vs. SS Lazio',
  'Sevilla FC vs. Real Betis',
  'Atlético Madrid vs. Valencia CF',
];

export const biggestWinsData: BiggestWin[] = Array.from({ length: 15 }, (_, i) => {
  const betAmount = Math.floor(1500000 + Math.random() * 2000000);
  const winAmount = Math.floor(3000000 + Math.random() * 4000000);

  return {
    id: i + 1,
    username: 'beachboy4',
    avatar: generateAvatarGradient(6),
    matchName: matchNames[i],
    betAmount,
    winAmount,
  };
});
