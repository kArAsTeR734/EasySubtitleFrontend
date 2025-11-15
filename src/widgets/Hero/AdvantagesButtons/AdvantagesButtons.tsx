import Button from "../../../shared/components/Button";
import './AdvantagesButtons.scss'

export const AdvantagesButtons = () => {
  return (
      <div className="advantages">
        <Button className="button button--advantage">Без регистрации</Button>
        <Button className="button button--advantage">Бесплатно</Button>
      </div>
  );
};

