import { useState, useEffect } from 'react';
import { courService, Cour } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import CourseCard from './CourseCard';
import CreateCourseForm from './CreateCourseForm';
import { Loader2, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CourseList = () => {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<Cour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await courService.getCours();
      setCourses(data);
    } catch (err) {
      setError('Impossible de charger les cours. Vérifiez votre connexion.');
      console.error('Error fetching courses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCourses();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mb-2 font-serif text-2xl font-semibold text-foreground">
          Bienvenue sur E-Learning
        </h2>
        <p className="max-w-md text-muted-foreground">
          Connectez-vous pour accéder à vos cours et commencer votre apprentissage.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Chargement des cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
          Erreur de chargement
        </h3>
        <p className="mb-4 max-w-md text-muted-foreground">{error}</p>
        <Button onClick={fetchCourses} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Mes cours
          </h2>
          <p className="text-muted-foreground">
            {courses.length} cours disponible{courses.length > 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchCourses} size="icon" className="shrink-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <CreateCourseForm onCourseCreated={fetchCourses} />
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
            Aucun cours disponible
          </h3>
          <p className="mb-4 max-w-sm text-sm text-muted-foreground">
            Commencez par créer votre premier cours en cliquant sur le bouton ci-dessus.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
