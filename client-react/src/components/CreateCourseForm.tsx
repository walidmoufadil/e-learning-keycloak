import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { courService, Cour } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, Loader2, BookPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const courseSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères').max(500, 'La description ne peut pas dépasser 500 caractères'),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CreateCourseFormProps {
  onCourseCreated: () => void;
}

const CreateCourseForm = ({ onCourseCreated }: CreateCourseFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: CourseFormData) => {
    setIsLoading(true);
    try {
      await courService.createCour(data as Cour);
      toast({
        title: 'Cours créé',
        description: 'Le cours a été créé avec succès.',
      });
      form.reset();
      setIsOpen(false);
      onCourseCreated();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la création du cours.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-elegant">
          <Plus className="h-4 w-4" />
          Nouveau cours
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
            <BookPlus className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center font-serif text-xl">
            Créer un nouveau cours
          </DialogTitle>
          <DialogDescription className="text-center">
            Remplissez les informations ci-dessous pour créer un nouveau cours.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du cours</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Introduction à React" 
                      {...field} 
                      className="border-border/60 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez le contenu du cours..."
                      className="min-h-[100px] resize-none border-border/60 focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" className="flex-1 shadow-elegant" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  'Créer le cours'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseForm;
