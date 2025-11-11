import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (username: string) => void;
}

const AuthDialog = ({ open, onOpenChange, onLogin }: AuthDialogProps) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('casinoUsers') || '[]');
    const user = users.find((u: any) => u.email === loginEmail && u.password === loginPassword);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin(user.username);
      onOpenChange(false);
      toast({
        title: "Успешно!",
        description: `Добро пожаловать, ${user.username}!`,
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверный email или пароль",
        variant: "destructive"
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerEmail || !registerPassword || !registerUsername || !registerConfirmPassword) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive"
      });
      return;
    }

    if (registerPassword.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен быть не менее 6 символов",
        variant: "destructive"
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('casinoUsers') || '[]');
    
    if (users.find((u: any) => u.email === registerEmail)) {
      toast({
        title: "Ошибка",
        description: "Пользователь с таким email уже существует",
        variant: "destructive"
      });
      return;
    }

    const newUser = {
      id: Date.now(),
      email: registerEmail,
      username: registerUsername,
      password: registerPassword,
      balance: 10000,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('casinoUsers', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    onLogin(newUser.username);
    onOpenChange(false);
    
    toast({
      title: "Регистрация успешна!",
      description: `Добро пожаловать, ${newUser.username}! На вашем счету ${newUser.balance} ₽`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-center neon-glow">
            NEON CASINO
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="bg-background border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-background border-primary/30"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary neon-border"
              >
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Имя пользователя</Label>
                <Input
                  id="register-username"
                  type="text"
                  placeholder="Ваше имя"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="bg-background border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="bg-background border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="bg-background border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Подтвердите пароль</Label>
                <Input
                  id="register-confirm"
                  type="password"
                  placeholder="Повторите пароль"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="bg-background border-primary/30"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-secondary to-accent neon-border"
              >
                <Icon name="UserPlus" size={18} className="mr-2" />
                Зарегистрироваться
              </Button>
              <p className="text-xs text-center text-foreground/60">
                При регистрации вы получаете 10 000 ₽ на счёт
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
