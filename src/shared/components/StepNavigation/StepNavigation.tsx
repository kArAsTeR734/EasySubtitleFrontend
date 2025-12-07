import './StepNavigation.scss';
import type { FC } from 'react';
import clsx from 'clsx';
import Button from '../Button';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  className?: string;
}

export const StepNavigation: FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextDisabled = false,
  backDisabled = false,
  className = '',
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const handleNextClick = () => {
    onNext();
  };

  return (
    <div className={clsx('step-navigation', className)}>
      <Button
        type="button"
        className={clsx('step-navigation__button', 'step-navigation__button--back')}
        onClick={onBack}
        disabled={backDisabled || isFirstStep}
        aria-label="Назад"
      >
        Назад
      </Button>

      <Button
        type="button"
        className={clsx('step-navigation__button', 'step-navigation__button--next', {
          'step-navigation__button--finish': isLastStep,
        })}
        onClick={handleNextClick}
        disabled={nextDisabled || isLastStep}
        aria-label="Перевести"
      >
        Перевести
      </Button>
    </div>
  );
};
