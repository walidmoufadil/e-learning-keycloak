import Header from '@/components/Header';
import CourseList from '@/components/CourseList';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
            Plateforme E-Learning
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Gérez vos cours en toute simplicité
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Créez, organisez et suivez vos cours en ligne. Une interface simple et intuitive 
            pour une expérience d'apprentissage optimale.
          </p>
        </div>
        <CourseList />
      </main>
      <footer className="mt-auto border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} E-Learning. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default Index;
