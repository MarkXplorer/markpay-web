import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepsProps {
  currentStep: number;
}

const steps: Step[] = [
  { id: 1, title: 'Landing', description: 'Informasi Web' },
  { id: 2, title: 'Payment', description: 'Pilih Metode' },
  { id: 3, title: 'Form', description: 'Isi Detail' },
  { id: 4, title: 'WhatsApp', description: 'Konfirmasi' },
];

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300
                    ${isActive ? 'step-active' : ''}
                    ${isCompleted ? 'step-completed' : ''}
                    ${!isActive && !isCompleted ? 'step-inactive' : ''}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${
                    isActive ? 'neon-text-cyan' : 
                    isCompleted ? 'neon-text-green' : 
                    'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </div>
                </div>
              </div>
              
              {!isLast && (
                <div 
                  className={`
                    w-16 h-1 mx-4 rounded-full transition-all duration-300
                    ${isCompleted ? 'bg-secondary' : 'bg-muted'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};