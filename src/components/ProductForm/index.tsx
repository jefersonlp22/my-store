import React, { useState, useEffect } from 'react';

import { Button, TextField } from '@material-ui/core';
import { PlusCircle, MinusCircle } from 'phosphor-react';

import { Select } from '~/components';
import { useLayout } from '~/contexts/layoutContexts';
import { storage } from '~/firebase/config';
import { useOptions } from '~/hooksApi/useOptions';
import { useProduct } from '~/hooksApi/useProduct';
import { Product } from '~/interfaces';

import * as S from './styles';

type ProductType = keyof Product;
export interface ProductFormProps {
  ownerData?: Product;
  setSteps?: (value: string) => void;
}

const categoryOptions = [
  {
    label: 'Selecione categoria',
    value: '',
  },
  {
    label: 'Dia dos Namorados',
    value: 'Dia dos Namorados',
  },
  {
    label: 'Masculino',
    value: 'Masculino',
  },
  {
    label: 'Feminino',
    value: 'Feminino',
  },
];

function ProductForm({ ownerData, setSteps }: ProductFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    ownerData as Product
  );
  const [selectedImg, setSelectedImg] = useState<any>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [addCategory, setAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [typesSelectedOptions, setTypesSelectedOptions] = useState([
    {
      label: 'Selecione uma opção',
      value: '',
    },
  ]);
  const [typeOptions, setTypeOptions] = useState([
    {
      label: 'Selecione uma opção',
      value: '',
    },
  ]);

  const { user } = useLayout();
  const { createProduct, updateProduct } = useProduct();
  const { getOptions } = useOptions();

  const imageRef = React.createRef<any>();

  useEffect(() => {
    if (user?.id) {
      setSelectedProduct({
        ...selectedProduct,
      });
    }
  }, [user?.id]);

  const onFileChange = (event: any) => {
    setSelectedImg(event.target.files[0]);
  };

  const fecthOptions = async () => {
    const options = await getOptions();
    if (options) {
      const newOptions = options?.map((o) => ({
        value: o.id,
        label: o.name as string,
      }));
      setTypeOptions((prev) => [...prev, ...newOptions]);
    }
  };

  useEffect(() => {
    fecthOptions();
  }, []);

  useEffect(() => {
    if (selectedImg) {
      const uploadTask = storage
        .ref(`images/${selectedImg?.name}`)
        .put(selectedImg);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error: any) => {
          console.log(error);
        },
        () => {
          storage
            .ref('images')
            .child(selectedImg?.name)
            .getDownloadURL()
            .then((url) => {
              handleProduct('picture_url', url);
            });
        }
      );
    }
  }, [selectedImg]);

  const handleProduct = (key: ProductType, value: number | string) => {
    setSelectedProduct({
      ...selectedProduct,
      [key]: value,
    });
  };

  const handleCreateProduct = async () => {
    await createProduct(selectedProduct);
    if (setSteps) {
      setSteps('store');
    }
  };

  const handleUpdateProduct = () => {
    updateProduct(selectedProduct);
  };

  const handleChangeCategory = (value: string | number | string[]) => {
    setSelectedCategory(value as string);
  };

  const handleChangeType = (value: string | number | string[]) => {
    setSelectedType(value as string);
  };

  const addOrRemoveOptions = () => ({
    add: () => {
      setTypesSelectedOptions([
        ...typesSelectedOptions,
        {
          label: 'Selecione uma opção',
          value: '',
        },
      ]);
    },
    remove: (index: number) => {
      const newList = [...typesSelectedOptions];
      newList.splice(index, 1);
      setTypesSelectedOptions(newList);
    },
  });

  console.log('typeOptions', typeOptions);

  return (
    <>
      <S.Content className="md:w-2/4 w-full">
        <div className="title">
          {selectedProduct?.id ? 'Editar Produto' : 'Cadrastrar Produto'}
        </div>
        <div className="flex">
          <S.BoxImage onClick={() => imageRef?.current.click()}>
            <div className="flex">
              <input
                style={{ display: 'none' }}
                ref={imageRef as any}
                type="file"
                onChange={(e) => onFileChange(e)}
              />
            </div>
          </S.BoxImage>
          <div className="w-8/12">
            <div className="w-full">
              <TextField
                onChange={(e) => handleProduct('name', e.target.value)}
                label="Nome"
                variant="standard"
                className="w-full"
                value={selectedProduct?.name}
                autoComplete="none"
                InputLabelProps={{ shrink: !!selectedProduct?.name }}
              />
            </div>
            <div className="mr-4 mt-3">
              <TextField
                className="w-full"
                onChange={(e) => handleProduct('description', e.target.value)}
                multiline
                rows={3}
                label="Descrição"
                value={selectedProduct?.description}
                autoComplete="none"
                InputLabelProps={{
                  shrink: !!selectedProduct?.description,
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mt-3">
            <TextField
              onChange={(e) => handleProduct('price', e.target.value)}
              label="Preço"
              variant="standard"
              value={selectedProduct?.price}
              InputLabelProps={{ shrink: !!selectedProduct?.price }}
            />
          </div>
          <div className="flex mr-4 ml-4 items-end">Ou</div>
          <div className="mt-3 ">
            <TextField
              onChange={(e) => handleProduct('list_price', e.target.value)}
              label="A partir de"
              variant="standard"
              value={selectedProduct?.list_price}
              autoComplete="none"
              className="w-full"
              InputLabelProps={{ shrink: !!selectedProduct?.list_price }}
            />
          </div>
        </div>
        <div className="md:flex grid items-end mt-3 w-full md:h-12">
          <div className="flex">
            <div className="w-48">
              <Select
                options={categoryOptions}
                selectedValue={selectedCategory}
                onChange={handleChangeCategory}
              />
            </div>
            <div
              onClick={() => setAddCategory(!addCategory)}
              className="flex mr-4 ml-4 items-end cursor-pointer"
            >
              {addCategory ? (
                <MinusCircle color="#4D4D4D" size={24} />
              ) : (
                <PlusCircle color="#4D4D4D" size={24} />
              )}
            </div>
          </div>
          {addCategory ? (
            <div className="flex items-end mt-3 w-full md:h-12">
              <div className="mt-0 ">
                <TextField
                  onChange={(e) => setCategoryName(e.target.value)}
                  label="Adcionar catégoria"
                  variant="standard"
                  value={categoryName}
                  autoComplete="none"
                  InputLabelProps={{ shrink: !!categoryName }}
                />
              </div>
              <div className="flex mr-2 ml-2 items-end">
                <Button
                  onClick={
                    selectedProduct?.id
                      ? handleUpdateProduct
                      : handleCreateProduct
                  }
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  Add
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-xs md:flex hidden text-gray-700">
              Adicionar nova categoria
            </div>
          )}
        </div>
        {typesSelectedOptions.map((type, index) => (
          <div
            key={index}
            className="md:flex justify-start items-end mt-3 md:h-12"
          >
            <div className="w-48 md:mr-3">
              <Select
                options={typeOptions}
                selectedValue={selectedType}
                onChange={handleChangeType}
              />
            </div>
            <div className="flex">
              <div className="md:mt-0  mt-3">
                <TextField
                  required
                  id="outlined-required"
                  label="Valor separados por(,)"
                  placeholder="Ex(P,M,G)"
                  value={typeValue}
                  onChange={(event) => setTypeValue(event.target.value)}
                />
              </div>
              <div className="flex">
                {index !== 0 && (
                  <div
                    onClick={() => addOrRemoveOptions().remove(index)}
                    className="flex mr-1 ml-4 items-end cursor-pointer"
                  >
                    <MinusCircle color="#4D4D4D" size={24} />
                  </div>
                )}
                {index + 1 === typesSelectedOptions.length && (
                  <div
                    onClick={() => addOrRemoveOptions().add()}
                    className="flex ml-4 mr-6 items-end cursor-pointer"
                  >
                    <PlusCircle color="#4D4D4D" size={24} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="mt-10">
          <Button
            onClick={
              selectedProduct?.id ? handleUpdateProduct : handleCreateProduct
            }
            color="primary"
            variant="outlined"
            size="medium"
          >
            Salvar
          </Button>
        </div>
      </S.Content>
    </>
  );
}

export { ProductForm };
