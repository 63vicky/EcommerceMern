import { filterOptions } from '@/config';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

const ProductFilter = ({ filters, handleFilters }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((item) => (
          <>
            <div>
              <h3 className="text-base font-bold capitalize">{item}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[item].map((option) => (
                  <>
                    <Label className="flex items-center gap-2 font-medium capitalize">
                      <Checkbox
                        onCheckedChange={() => handleFilters(item, option.id)}
                      />
                      {option.label}
                    </Label>
                  </>
                ))}
              </div>
            </div>
            <Separator />
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
