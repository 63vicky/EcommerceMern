/* eslint-disable react/prop-types */
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const FormCommon = ({
  formControls,
  buttonText,
  formData,
  onSubmit,
  setFormData,
  isButtonDisabled,
}) => {
  function renderInputItem(getItem) {
    let element = null;
    const value = formData[getItem.name] || '';

    switch (getItem.componentType) {
      case 'input':
        switch (getItem.type) {
          case 'number':
            element = (
              <Input
                onScroll={() => {
                  return false;
                }}
                placeholder={getItem.placeholder}
                name={getItem.name}
                id={getItem.name}
                type={getItem.type}
                value={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [getItem.name]: e.target.value,
                  })
                }
                key={getItem.name}
              />
            );
            break;
          default:
            element = (
              <Input
                placeholder={getItem.placeholder}
                name={getItem.name}
                id={getItem.name}
                type={getItem.type}
                value={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [getItem.name]: e.target.value,
                  })
                }
                key={getItem.name}
              />
            );
            break;
        }
        break;
      case 'select':
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getItem.options && getItem.options.length > 0
                ? getItem.options.map((getOption) => {
                    return (
                      <SelectItem value={getOption.id} key={getOption.id}>
                        {getOption.label}
                      </SelectItem>
                    );
                  })
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case 'textarea':
        element = (
          <Textarea
            placeholder={getItem.placeholder}
            name={getItem.name}
            id={getItem.id}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            placeholder={getItem.placeholder}
            name={getItem.name}
            id={getItem.name}
            type={getItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => {
          return (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
              <Label className="mb-1">{controlItem.label}</Label>
              {renderInputItem(controlItem)}
            </div>
          );
        })}
        <Button
          disabled={isButtonDisabled}
          className={`${
            isButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
          } mt-2 w-full`}
          type="submit"
        >
          {buttonText || 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default FormCommon;
