import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GameHistory {
  multiplier: number;
  timestamp: number;
}

const RocketGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.00);
  const [betAmount, setBetAmount] = useState(100);
  const [balance, setBalance] = useState(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      return userData.balance || 10000;
    }
    return 10000;
  });
  const [hasActiveBet, setHasActiveBet] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [cashoutMultiplier, setCashoutMultiplier] = useState(0);
  const [history, setHistory] = useState<GameHistory[]>([
    { multiplier: 2.45, timestamp: Date.now() - 60000 },
    { multiplier: 1.23, timestamp: Date.now() - 120000 },
    { multiplier: 5.67, timestamp: Date.now() - 180000 },
    { multiplier: 1.05, timestamp: Date.now() - 240000 },
    { multiplier: 3.21, timestamp: Date.now() - 300000 },
  ]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setBalance(userData.balance || 10000);
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      userData.balance = balance;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      const users = JSON.parse(localStorage.getItem('casinoUsers') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === userData.id);
      if (userIndex !== -1) {
        users[userIndex].balance = balance;
        localStorage.setItem('casinoUsers', JSON.stringify(users));
      }
    }
  }, [balance]);
  
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isPlaying && !cashedOut) {
      const increment = Math.random() * 0.15 + 0.05;
      const crashPoint = Math.random() * 8 + 1.2;
      
      gameIntervalRef.current = setInterval(() => {
        setMultiplier(prev => {
          const newValue = prev + increment;
          
          if (newValue >= crashPoint) {
            crashGame(newValue);
            return newValue;
          }
          
          return newValue;
        });
      }, 100);
    } else {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
    }

    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
    };
  }, [isPlaying, cashedOut]);

  useEffect(() => {
    drawRocket();
  }, [multiplier, isPlaying]);

  const drawRocket = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const points = 50;
    for (let i = 0; i < points; i++) {
      const x = (canvas.width / points) * i;
      const baseY = canvas.height - 50;
      const y = baseY - (Math.log(1 + (multiplier - 1) * (i / points)) * 100);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    if (isPlaying && !cashedOut) {
      const rocketX = canvas.width * 0.8;
      const rocketY = canvas.height - 50 - (Math.log(multiplier) * 100);
      
      ctx.save();
      ctx.translate(rocketX, rocketY);
      ctx.rotate(-Math.PI / 6);
      
      ctx.fillStyle = '#D946EF';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#D946EF';
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(10, 15);
      ctx.lineTo(-10, 15);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    }
  };

  const startGame = () => {
    if (betAmount > balance) return;
    
    setIsPlaying(true);
    setMultiplier(1.00);
    setHasActiveBet(true);
    setCashedOut(false);
    setBalance(prev => prev - betAmount);
  };

  const cashOut = () => {
    if (!hasActiveBet || cashedOut) return;
    
    setCashedOut(true);
    setCashoutMultiplier(multiplier);
    const winAmount = Math.floor(betAmount * multiplier);
    setBalance(prev => prev + winAmount);
    
    setTimeout(() => {
      resetGame();
    }, 2000);
  };

  const crashGame = (finalMultiplier: number) => {
    setIsPlaying(false);
    
    if (!cashedOut) {
      setHistory(prev => [{ multiplier: finalMultiplier, timestamp: Date.now() }, ...prev.slice(0, 9)]);
    }
    
    setTimeout(() => {
      resetGame();
    }, 3000);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setMultiplier(1.00);
    setHasActiveBet(false);
    setCashedOut(false);
    setCashoutMultiplier(0);
  };

  const getMultiplierColor = () => {
    if (multiplier < 2) return 'text-primary';
    if (multiplier < 5) return 'text-secondary';
    return 'text-accent';
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="bg-card border-primary/30">
          <CardContent className="p-6">
            <div className="relative bg-background/50 rounded-lg overflow-hidden" style={{ height: '400px' }}>
              <canvas 
                ref={canvasRef} 
                width={800} 
                height={400}
                className="w-full h-full"
              />
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className={`text-8xl font-black ${getMultiplierColor()} neon-glow transition-all`}>
                  {multiplier.toFixed(2)}x
                </div>
                {cashedOut && (
                  <div className="text-2xl text-green-400 mt-4 animate-fade-in">
                    <Icon name="CheckCircle" size={32} className="inline mr-2" />
                    Выплата: {Math.floor(betAmount * cashoutMultiplier)} ₽
                  </div>
                )}
                {!isPlaying && !cashedOut && hasActiveBet && (
                  <div className="text-2xl text-red-400 mt-4 animate-fade-in">
                    <Icon name="XCircle" size={32} className="inline mr-2" />
                    Взрыв!
                  </div>
                )}
              </div>

              {!isPlaying && !hasActiveBet && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <p className="text-xl text-foreground/70">Сделайте ставку для начала</p>
                  </div>
                </div>
              )}

              {isPlaying && (
                <Badge className="absolute top-4 left-4 bg-green-500 text-white animate-pulse-glow">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  В ИГРЕ
                </Badge>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="text-sm text-foreground/60 mb-1">Игроков</div>
                <div className="text-2xl font-bold neon-glow">347</div>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div className="text-sm text-foreground/60 mb-1">Общая ставка</div>
                <div className="text-2xl font-bold neon-pink-glow">₽ 89,230</div>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/30">
                <div className="text-sm text-foreground/60 mb-1">Макс. x</div>
                <div className="text-2xl font-bold neon-blue-glow">12.45x</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="text-sm text-foreground/60 mb-1">Средний x</div>
                <div className="text-2xl font-bold text-green-400">2.34x</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-card border-secondary/30">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground/60">Баланс</span>
                <span className="text-2xl font-bold neon-pink-glow">₽ {balance.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-foreground/70 mb-2 block">Размер ставки</label>
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  disabled={isPlaying || hasActiveBet}
                  className="bg-background border-primary/30"
                />
                <div className="flex gap-2 mt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setBetAmount(prev => Math.max(10, prev / 2))}
                    disabled={isPlaying || hasActiveBet}
                  >
                    ½
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setBetAmount(prev => Math.min(balance, prev * 2))}
                    disabled={isPlaying || hasActiveBet}
                  >
                    2x
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setBetAmount(balance)}
                    disabled={isPlaying || hasActiveBet}
                  >
                    MAX
                  </Button>
                </div>
              </div>

              {!hasActiveBet ? (
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary neon-border text-lg py-6"
                  onClick={startGame}
                  disabled={betAmount > balance || betAmount < 10}
                >
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Сделать ставку
                </Button>
              ) : (
                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-lg py-6"
                  onClick={cashOut}
                  disabled={cashedOut || !isPlaying}
                >
                  <Icon name="DollarSign" size={20} className="mr-2" />
                  Забрать {Math.floor(betAmount * multiplier)} ₽
                </Button>
              )}

              {hasActiveBet && cashedOut && (
                <div className="text-center text-green-400 font-semibold animate-fade-in">
                  Выигрыш: +{Math.floor(betAmount * cashoutMultiplier - betAmount)} ₽
                </div>
              )}
              {hasActiveBet && !isPlaying && !cashedOut && (
                <div className="text-center text-red-400 font-semibold animate-fade-in">
                  Потеря: -{betAmount} ₽
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-accent/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 neon-blue-glow">История раундов</h3>
            <div className="space-y-2">
              {history.map((game, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    game.multiplier < 2 ? 'bg-red-500/10 border border-red-500/30' : 
                    game.multiplier < 5 ? 'bg-yellow-500/10 border border-yellow-500/30' :
                    'bg-green-500/10 border border-green-500/30'
                  }`}
                >
                  <span className={`font-bold ${
                    game.multiplier < 2 ? 'text-red-400' :
                    game.multiplier < 5 ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {game.multiplier.toFixed(2)}x
                  </span>
                  <span className="text-xs text-foreground/60">
                    {new Date(game.timestamp).toLocaleTimeString('ru-RU', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RocketGame;