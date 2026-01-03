import { Cour } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ChevronRight } from 'lucide-react';

interface CourseCardProps {
  course: Cour;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  return (
    <Card 
      className="group cursor-pointer border-border/50 bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
        <CardTitle className="mt-4 font-serif text-lg font-semibold text-foreground line-clamp-2">
          {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {course.description || 'Aucune description disponible pour ce cours.'}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Cours #{course.id}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
