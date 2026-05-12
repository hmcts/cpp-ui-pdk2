import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  createValidatorForFormControl,
  InputValidators,
  PdkMaxCountValidatorDirective,
  PdkMaxValueValidatorDirective,
  PdkMaximumLengthValidatorDirective,
  PdkMinCountValidatorDirective,
  PdkMinValueValidatorDirective,
  PdkValidatorDirective
} from '../input.validators';

describe('InputValidators', () => {
  describe('maxValue', () => {
    it('should return null when value is not an integer', () => {
      const validator = InputValidators.maxValue(10);
      const control = new FormControl('string');
      expect(validator(control)).toBeNull();
    });

    it('should return null when value is less than max', () => {
      const validator = InputValidators.maxValue(10);
      const control = new FormControl(5);
      expect(validator(control)).toBeNull();
    });

    it('should return null when value equals max', () => {
      const validator = InputValidators.maxValue(10);
      const control = new FormControl(10);
      expect(validator(control)).toBeNull();
    });

    it('should return error when value exceeds max', () => {
      const validator = InputValidators.maxValue(10);
      const control = new FormControl(15);
      const result = validator(control);
      expect(result).toEqual({
        maxValue: {
          expected: 10,
          actual: 15
        }
      });
    });

    it('should handle negative numbers', () => {
      const validator = InputValidators.maxValue(-5);
      const control = new FormControl(-10);
      expect(validator(control)).toBeNull();
    });

    it('should handle negative numbers exceeding max', () => {
      const validator = InputValidators.maxValue(-10);
      const control = new FormControl(-5);
      const result = validator(control);
      expect(result).toEqual({
        maxValue: {
          expected: -10,
          actual: -5
        }
      });
    });
  });

  describe('minValue', () => {
    it('should return null when value is not an integer', () => {
      const validator = InputValidators.minValue(10);
      const control = new FormControl('string');
      expect(validator(control)).toBeNull();
    });

    it('should return null when value is greater than min', () => {
      const validator = InputValidators.minValue(5);
      const control = new FormControl(10);
      expect(validator(control)).toBeNull();
    });

    it('should return null when value equals min', () => {
      const validator = InputValidators.minValue(5);
      const control = new FormControl(5);
      expect(validator(control)).toBeNull();
    });

    it('should return error when value is less than min', () => {
      const validator = InputValidators.minValue(10);
      const control = new FormControl(5);
      const result = validator(control);
      expect(result).toEqual({
        minValue: {
          expected: 10,
          actual: 5
        }
      });
    });

    it('should handle negative numbers', () => {
      const validator = InputValidators.minValue(-10);
      const control = new FormControl(-5);
      expect(validator(control)).toBeNull();
    });

    it('should handle negative numbers less than min', () => {
      const validator = InputValidators.minValue(-5);
      const control = new FormControl(-10);
      const result = validator(control);
      expect(result).toEqual({
        minValue: {
          expected: -5,
          actual: -10
        }
      });
    });
  });

  describe('minCount', () => {
    it('should return null when value is empty', () => {
      const validator = InputValidators.minCount(2);
      const control = new FormControl(null);
      expect(validator(control)).toBeNull();
    });

    it('should return null when array length meets minimum', () => {
      const validator = InputValidators.minCount(2);
      const control = new FormControl([1, 2, 3]);
      expect(validator(control)).toBeNull();
    });

    it('should return null when array length equals minimum', () => {
      const validator = InputValidators.minCount(2);
      const control = new FormControl([1, 2]);
      expect(validator(control)).toBeNull();
    });

    it('should return error when array length is less than minimum', () => {
      const validator = InputValidators.minCount(3);
      const control = new FormControl([1, 2]);
      const result = validator(control);
      expect(result).toEqual({
        minCount: {
          expected: 3,
          actual: [1, 2]
        }
      });
    });

    it('should work with strings', () => {
      const validator = InputValidators.minCount(3);
      const control = new FormControl('ab');
      const result = validator(control);
      expect(result).toEqual({
        minCount: {
          expected: 3,
          actual: 'ab'
        }
      });
    });
  });

  describe('maxCount', () => {
    it('should return null when value is empty', () => {
      const validator = InputValidators.maxCount(2);
      const control = new FormControl(null);
      expect(validator(control)).toBeNull();
    });

    it('should return null when array length is less than maximum', () => {
      const validator = InputValidators.maxCount(3);
      const control = new FormControl([1, 2]);
      expect(validator(control)).toBeNull();
    });

    it('should return null when array length equals maximum', () => {
      const validator = InputValidators.maxCount(3);
      const control = new FormControl([1, 2, 3]);
      expect(validator(control)).toBeNull();
    });

    it('should return error when array length exceeds maximum', () => {
      const validator = InputValidators.maxCount(2);
      const control = new FormControl([1, 2, 3]);
      const result = validator(control);
      expect(result).toEqual({
        maxCount: {
          expected: 2,
          actual: [1, 2, 3]
        }
      });
    });

    it('should work with strings', () => {
      const validator = InputValidators.maxCount(2);
      const control = new FormControl('abcd');
      const result = validator(control);
      expect(result).toEqual({
        maxCount: {
          expected: 2,
          actual: 'abcd'
        }
      });
    });
  });

  describe('maximumLength', () => {
    it('should return null when value is empty', () => {
      const validator = InputValidators.maximumLength(10);
      const control = new FormControl(null);
      expect(validator(control)).toBeNull();
    });

    it('should return null when string length is less than maximum', () => {
      const validator = InputValidators.maximumLength(10);
      const control = new FormControl('hello');
      expect(validator(control)).toBeNull();
    });

    it('should return null when string length equals maximum', () => {
      const validator = InputValidators.maximumLength(5);
      const control = new FormControl('hello');
      expect(validator(control)).toBeNull();
    });

    it('should return error when string length exceeds maximum', () => {
      const validator = InputValidators.maximumLength(5);
      const control = new FormControl('hello world');
      const result = validator(control);
      expect(result).toEqual({
        maximumLength: {
          expected: 5,
          actual: 'hello world'
        }
      });
    });

    it('should handle empty strings', () => {
      const validator = InputValidators.maximumLength(10);
      const control = new FormControl('');
      expect(validator(control)).toBeNull();
    });

    it('should handle unicode characters', () => {
      const validator = InputValidators.maximumLength(5);
      const control = new FormControl('你好');
      expect(validator(control)).toBeNull();
    });
  });
});

describe('createValidatorForFormControl', () => {
  it('should create a validator function that calls the provided function', () => {
    const validateFn = (value: unknown) => {
      if (value === 'invalid') {
        return { custom: true };
      }
      return null;
    };

    const validator = createValidatorForFormControl(validateFn);
    const control = new FormControl('invalid');

    expect(validator(control)).toEqual({ custom: true });
  });

  it('should return null from created validator when inner function returns null', () => {
    const validateFn = (_value: unknown) => null;
    const validator = createValidatorForFormControl(validateFn);
    const control = new FormControl('any value');

    expect(validator(control)).toBeNull();
  });

  it('should pass control value to the validation function', () => {
    const mockValidateFn = jest.fn().mockReturnValue(null);
    const validator = createValidatorForFormControl(mockValidateFn);
    const control = new FormControl('test value');

    validator(control);

    expect(mockValidateFn).toHaveBeenCalledWith('test value');
  });
});

describe('PdkValidatorDirective', () => {
  let fixture: ComponentFixture<ValidatorTestComponent>;
  let directive: PdkValidatorDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatorTestComponent],
      imports: [ReactiveFormsModule, PdkValidatorDirective]
    });

    fixture = TestBed.createComponent(ValidatorTestComponent);
    fixture.detectChanges();
  });

  it('should validate control using provided validator function', () => {
    const mockValidator = jest.fn().mockReturnValue(null);
    const input = fixture.debugElement.children[0];
    directive = input.injector.get(PdkValidatorDirective);
    directive.validator = mockValidator;

    const control = new FormControl('test');
    const result = directive.validate(control);

    expect(mockValidator).toHaveBeenCalledWith(control);
    expect(result).toBeNull();
  });

  it('should return validation errors from provided validator', () => {
    const mockValidator = jest.fn().mockReturnValue({
      custom: true
    });
    const input = fixture.debugElement.children[0];
    directive = input.injector.get(PdkValidatorDirective);
    directive.validator = mockValidator;

    const control = new FormControl('test');
    const result = directive.validate(control);

    expect(result).toEqual({ custom: true });
  });
});

describe('PdkMaxValueValidatorDirective', () => {
  let fixture: ComponentFixture<MaxValueValidatorTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaxValueValidatorTestComponent],
      imports: [ReactiveFormsModule, PdkMaxValueValidatorDirective]
    });

    fixture = TestBed.createComponent(MaxValueValidatorTestComponent);
  });

  it('should validate max value', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('maxValue');
    expect(control?.hasError('maxValue')).toBeFalsy();

    control?.setValue(15);
    expect(control?.hasError('maxValue')).toBeTruthy();
  });

  it('should update validation when maxValue input changes', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('maxValue');

    control?.setValue(5);
    expect(control?.valid).toBeTruthy();

    fixture.componentInstance.maxValue = 3;
    fixture.detectChanges();
    expect(control?.valid).toBeFalsy();
  });
});

describe('PdkMinValueValidatorDirective', () => {
  let fixture: ComponentFixture<MinValueValidatorTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinValueValidatorTestComponent],
      imports: [ReactiveFormsModule, PdkMinValueValidatorDirective]
    });

    fixture = TestBed.createComponent(MinValueValidatorTestComponent);
  });

  it('should validate min value', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('minValue');
    expect(control?.hasError('minValue')).toBeFalsy();

    control?.setValue(2);
    expect(control?.hasError('minValue')).toBeTruthy();
  });

  it('should update validation when minValue input changes', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('minValue');

    control?.setValue(5);
    expect(control?.valid).toBeTruthy();

    fixture.componentInstance.minValue = 10;
    fixture.detectChanges();
    expect(control?.valid).toBeFalsy();
  });
});

describe('PdkMinCountValidatorDirective', () => {
  let fixture: ComponentFixture<MinCountValidatorTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinCountValidatorTestComponent],
      imports: [ReactiveFormsModule, PdkMinCountValidatorDirective]
    });

    fixture = TestBed.createComponent(MinCountValidatorTestComponent);
  });

  it('should validate min count', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('minCount');
    expect(control?.hasError('minCount')).toBeFalsy();

    control?.setValue([1]);
    expect(control?.hasError('minCount')).toBeTruthy();
  });

  it('should update validation when minCount input changes', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('minCount');

    control?.setValue([1, 2]);
    expect(control?.valid).toBeTruthy();

    fixture.componentInstance.minCount = 3;
    fixture.detectChanges();
    expect(control?.valid).toBeFalsy();
  });
});

describe('PdkMaxCountValidatorDirective', () => {
  let fixture: ComponentFixture<MaxCountValidatorTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaxCountValidatorTestComponent],
      imports: [ReactiveFormsModule, PdkMaxCountValidatorDirective]
    });

    fixture = TestBed.createComponent(MaxCountValidatorTestComponent);
  });

  it('should validate max count', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('maxCount');
    expect(control?.hasError('maxCount')).toBeFalsy();

    control?.setValue([1, 2, 3]);
    expect(control?.hasError('maxCount')).toBeTruthy();
  });

  it('should update validation when maxCount input changes', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('maxCount');

    control?.setValue([1, 2]);
    expect(control?.valid).toBeTruthy();

    fixture.componentInstance.maxCount = 1;
    fixture.detectChanges();
    expect(control?.valid).toBeFalsy();
  });
});

describe('PdkMaximumLengthValidatorDirective', () => {
  let fixture: ComponentFixture<MaximumLengthValidatorTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaximumLengthValidatorTestComponent],
      imports: [ReactiveFormsModule, PdkMaximumLengthValidatorDirective]
    });

    fixture = TestBed.createComponent(MaximumLengthValidatorTestComponent);
  });

  it('should validate maximum length', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('maximumLength');
    expect(control?.hasError('maximumLength')).toBeFalsy();

    control?.setValue('toolong');
    expect(control?.hasError('maximumLength')).toBeTruthy();
  });

  it('should update validation when maximumLength input changes', () => {
    fixture.detectChanges();
    const control = fixture.componentInstance.form.get('maximumLength');

    control?.setValue('hello');
    expect(control?.valid).toBeTruthy();

    fixture.componentInstance.maximumLength = 3;
    fixture.detectChanges();
    expect(control?.valid).toBeFalsy();
  });
});

// Test Components
@Component({
  selector: 'pdk-validator-test',
  template: `<input [validator]="validator" />`,
  standalone: false
})
class ValidatorTestComponent {
  validator: any;
}

@Component({
  selector: 'pdk-max-value-test',
  template: `<form [formGroup]="form">
    <input formControlName="maxValue" [maxValue]="maxValue" />
  </form>`,
  standalone: false
})
class MaxValueValidatorTestComponent {
  maxValue = 10;
  form = new FormGroup({
    maxValue: new FormControl(5)
  });
}

@Component({
  selector: 'pdk-min-value-test',
  template: `<form [formGroup]="form">
    <input formControlName="minValue" [minValue]="minValue" />
  </form>`,
  standalone: false
})
class MinValueValidatorTestComponent {
  minValue = 5;
  form = new FormGroup({
    minValue: new FormControl(10)
  });
}

@Component({
  selector: 'pdk-min-count-test',
  template: `<form [formGroup]="form">
    <input formControlName="minCount" [minCount]="minCount" />
  </form>`,
  standalone: false
})
class MinCountValidatorTestComponent {
  minCount = 2;
  form = new FormGroup({
    minCount: new FormControl([1, 2])
  });
}

@Component({
  selector: 'pdk-max-count-test',
  template: `<form [formGroup]="form">
    <input formControlName="maxCount" [maxCount]="maxCount" />
  </form>`,
  standalone: false
})
class MaxCountValidatorTestComponent {
  maxCount = 2;
  form = new FormGroup({
    maxCount: new FormControl([1, 2])
  });
}

@Component({
  selector: 'pdk-maximum-length-test',
  template: `<form [formGroup]="form">
    <input formControlName="maximumLength" [maximumLength]="maximumLength" />
  </form>`,
  standalone: false
})
class MaximumLengthValidatorTestComponent {
  maximumLength = 5;
  form = new FormGroup({
    maximumLength: new FormControl('hello')
  });
}
