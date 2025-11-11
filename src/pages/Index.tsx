import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const games = [
    {
      id: 1,
      name: 'Европейская Рулетка',
      type: 'european',
      players: 1247,
      minBet: 10,
      maxBet: 5000,
      isLive: true
    },
    {
      id: 2,
      name: 'Американская Рулетка',
      type: 'american',
      players: 893,
      minBet: 10,
      maxBet: 10000,
      isLive: true
    }
  ];

  const liveDealers = [
    { id: 1, name: 'София', rating: 4.9, table: 'Европейская #1' },
    { id: 2, name: 'Максим', rating: 4.8, table: 'Американская #2' },
    { id: 3, name: 'Анастасия', rating: 5.0, table: 'Европейская #3' }
  ];

  const bonuses = [
    { title: 'Приветственный бонус', amount: '200%', description: 'До 100 000 ₽ на первый депозит', icon: 'Gift' },
    { title: 'Кэшбэк', amount: '15%', description: 'Еженедельный возврат средств', icon: 'Percent' },
    { title: 'Фриспины', amount: '100', description: 'За регистрацию и верификацию', icon: 'Sparkles' }
  ];

  const tournaments = [
    { name: 'Турнир Чемпионов', prize: '5 000 000 ₽', participants: 2453, endDate: '15.11.2025' },
    { name: 'Вечерний Rush', prize: '500 000 ₽', participants: 847, endDate: '11.11.2025' },
    { name: 'Недельный Марафон', prize: '2 000 000 ₽', participants: 1923, endDate: '17.11.2025' }
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-pulse-glow" />
              <h1 className="text-2xl font-black neon-glow">NEON CASINO</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {['home', 'games', 'bonuses', 'tournaments', 'rules', 'support'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-semibold uppercase transition-all hover:text-primary ${
                    activeSection === section ? 'text-primary neon-glow' : 'text-foreground/70'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'games' && 'Игры'}
                  {section === 'bonuses' && 'Бонусы'}
                  {section === 'tournaments' && 'Турниры'}
                  {section === 'rules' && 'Правила'}
                  {section === 'support' && 'Поддержка'}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-primary/50 hover:bg-primary/20">Вход</Button>
              <Button className="bg-gradient-to-r from-primary via-secondary to-accent neon-border">
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-pulse-glow" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] animate-pulse-glow" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/50 text-lg px-6 py-2">
                <Icon name="Zap" size={16} className="mr-2" />
                Онлайн с Live-дилерами
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black mb-6 neon-glow">
                ДОБРО ПОЖАЛОВАТЬ
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-light">
                Испытай удачу в самом динамичном казино с неоновой подсветкой
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary via-secondary to-accent neon-border text-lg px-8 py-6"
                  onClick={() => scrollToSection('games')}
                >
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать играть
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary/50 hover:bg-primary/20 text-lg px-8 py-6"
                  onClick={() => scrollToSection('bonuses')}
                >
                  <Icon name="Gift" size={20} className="mr-2" />
                  Получить бонус
                </Button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-black neon-pink-glow mb-2">24/7</div>
                  <div className="text-sm text-foreground/60">Круглосуточно</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black neon-blue-glow mb-2">2000+</div>
                  <div className="text-sm text-foreground/60">Игроков онлайн</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black neon-glow mb-2">5 сек</div>
                  <div className="text-sm text-foreground/60">Вывод средств</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="games" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 neon-glow">РУЛЕТКА</h2>
              <p className="text-xl text-foreground/70">Выбери свой стол с живым дилером</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="all">Все столы</TabsTrigger>
                <TabsTrigger value="european">Европейская</TabsTrigger>
                <TabsTrigger value="american">Американская</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {games.map((game) => (
                    <Card key={game.id} className="bg-card border-primary/30 overflow-hidden group hover:border-primary/60 transition-all">
                      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <div className="w-32 h-32 border-8 border-foreground/20 rounded-full relative animate-spin-slow">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 bg-primary rounded-full animate-pulse-glow" />
                          </div>
                        </div>
                        {game.isLive && (
                          <Badge className="absolute top-4 right-4 bg-red-500 text-white animate-pulse-glow">
                            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                            LIVE
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-2 neon-pink-glow">{game.name}</h3>
                        <div className="flex items-center gap-2 mb-4 text-sm text-foreground/60">
                          <Icon name="Users" size={16} />
                          <span>{game.players} игроков</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-xs text-foreground/60">Мин. ставка</div>
                            <div className="font-bold">{game.minBet} ₽</div>
                          </div>
                          <div>
                            <div className="text-xs text-foreground/60">Макс. ставка</div>
                            <div className="font-bold neon-blue-glow">{game.maxBet.toLocaleString()} ₽</div>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary neon-border">
                          Играть сейчас
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="european">
                <div className="grid md:grid-cols-2 gap-6">
                  {games.filter(g => g.type === 'european').map((game) => (
                    <Card key={game.id} className="bg-card border-primary/30">
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold neon-pink-glow">{game.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="american">
                <div className="grid md:grid-cols-2 gap-6">
                  {games.filter(g => g.type === 'american').map((game) => (
                    <Card key={game.id} className="bg-card border-primary/30">
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold neon-pink-glow">{game.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-16">
              <h3 className="text-3xl font-bold mb-8 text-center neon-blue-glow">Наши дилеры онлайн</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {liveDealers.map((dealer) => (
                  <Card key={dealer.id} className="bg-card border-secondary/30 hover:border-secondary/60 transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent animate-pulse-glow flex items-center justify-center">
                        <Icon name="User" size={40} />
                      </div>
                      <h4 className="text-xl font-bold mb-2">{dealer.name}</h4>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{dealer.rating}</span>
                      </div>
                      <p className="text-sm text-foreground/60 mb-4">{dealer.table}</p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                        Свободен
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="bonuses" className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 neon-pink-glow">БОНУСЫ</h2>
              <p className="text-xl text-foreground/70">Максимальная выгода для каждого игрока</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {bonuses.map((bonus, index) => (
                <Card key={index} className="bg-card border-accent/30 hover:border-accent/60 transition-all group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center neon-border">
                      <Icon name={bonus.icon as any} size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{bonus.title}</h3>
                    <div className="text-5xl font-black neon-blue-glow mb-4">{bonus.amount}</div>
                    <p className="text-foreground/60 mb-6">{bonus.description}</p>
                    <Button className="w-full bg-gradient-to-r from-accent to-primary">
                      Получить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="tournaments" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 neon-glow">ТУРНИРЫ</h2>
              <p className="text-xl text-foreground/70">Соревнуйся и выигрывай миллионы</p>
            </div>
            <div className="space-y-4 max-w-4xl mx-auto">
              {tournaments.map((tournament, index) => (
                <Card key={index} className="bg-card border-primary/30 hover:border-primary/60 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 neon-pink-glow">{tournament.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-foreground/60">
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={16} />
                            <span>{tournament.participants} участников</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Calendar" size={16} />
                            <span>До {tournament.endDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-foreground/60 mb-1">Призовой фонд</div>
                        <div className="text-3xl font-black neon-blue-glow">{tournament.prize}</div>
                      </div>
                      <Button className="bg-gradient-to-r from-primary to-secondary neon-border">
                        Участвовать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="rules" className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 neon-blue-glow">ПРАВИЛА</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="bg-card border-primary/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Icon name="Shield" size={24} className="text-primary" />
                    Безопасность и честность
                  </h3>
                  <p className="text-foreground/70">
                    Все игры используют сертифицированный генератор случайных чисел. 
                    Результаты честны и не могут быть изменены.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-secondary/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Icon name="Wallet" size={24} className="text-secondary" />
                    Депозиты и выводы
                  </h3>
                  <p className="text-foreground/70">
                    Минимальный депозит - 100 ₽. Вывод средств обрабатывается в течение 5 секунд на электронные кошельки.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-accent/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Icon name="Users" size={24} className="text-accent" />
                    Возрастные ограничения
                  </h3>
                  <p className="text-foreground/70">
                    Участие в азартных играх разрешено только лицам старше 18 лет. Верификация обязательна.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="support" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 neon-pink-glow">ПОДДЕРЖКА</h2>
              <p className="text-xl text-foreground/70">Мы всегда на связи 24/7</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-card border-primary/30 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="MessageCircle" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Онлайн-чат</h3>
                  <p className="text-sm text-foreground/60 mb-4">Средний ответ: 30 секунд</p>
                  <Button className="w-full">Открыть чат</Button>
                </CardContent>
              </Card>
              <Card className="bg-card border-secondary/30 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <Icon name="Mail" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p className="text-sm text-foreground/60 mb-4">support@neoncasino.com</p>
                  <Button variant="outline" className="w-full">Написать</Button>
                </CardContent>
              </Card>
              <Card className="bg-card border-accent/30 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Icon name="Phone" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Телефон</h3>
                  <p className="text-sm text-foreground/60 mb-4">8-800-555-35-35</p>
                  <Button variant="outline" className="w-full">Позвонить</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card/50 border-t border-primary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-pulse-glow" />
              <div>
                <h3 className="text-xl font-black neon-glow">NEON CASINO</h3>
                <p className="text-xs text-foreground/60">© 2025 Все права защищены</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Icon name="Facebook" size={24} className="cursor-pointer hover:text-primary transition-colors" />
              <Icon name="Twitter" size={24} className="cursor-pointer hover:text-secondary transition-colors" />
              <Icon name="Instagram" size={24} className="cursor-pointer hover:text-accent transition-colors" />
              <Icon name="Youtube" size={24} className="cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-foreground/40">
            <p>Азартные игры могут вызывать игровую зависимость. Играйте ответственно. 18+</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
