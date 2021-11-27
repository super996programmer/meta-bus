import { CityType } from '@src/api/model';
import OptionDialog from '@src/components/OptionDialog';
import { IOption } from '@src/model';
import { FC, useMemo, useState, createContext, useCallback } from 'react';

interface Context {
  selectedCity: CityType;
  selectedCityDesc?: string;
  openCityOptionsDialog: () => void;
}

const defaultCityOptions: IOption<CityType>[] = [
  { text: '台北市', value: 'Taipei' },
  { text: '新北市', value: 'NewTaipei' },
  { text: '高雄市', value: 'Kaohsiung' },
];

export const CitySelectContext = createContext<Context>({
  selectedCity: defaultCityOptions[0].value,
  selectedCityDesc: defaultCityOptions[0].text,
  openCityOptionsDialog: () => null,
});

export const CitySelectProvider: FC = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<CityType>('Taipei');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openCityOptionsDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const contextValue: Context = useMemo(
    () => ({
      selectedCity,
      selectedCityDesc: defaultCityOptions.find(
        (option) => option.value === selectedCity
      )?.text,
      openCityOptionsDialog,
    }),
    [selectedCity, openCityOptionsDialog]
  );

  return (
    <CitySelectContext.Provider value={contextValue}>
      {children}
      {isOpen && (
        <OptionDialog
          options={defaultCityOptions}
          onSelectHandler={(value) => {
            setSelectedCity(value);
            setIsOpen(false);
          }}
          selectedValue={selectedCity}
        />
      )}
    </CitySelectContext.Provider>
  );
};
