import { TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import Layout from '../../layouts';
import { NextPageWithLayout } from '../_app';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
interface InputField {
  label?: string;
  name: 'username' | 'password';
}

interface DataField {
  email: string;
  password: string;
}

const inputData: InputField[] = [
  {
    label: 'UserName',
    name: 'username',
  },
  {
    label: 'Password',
    name: 'password',
  },
];

const Task: NextPageWithLayout = () => {
  const Schema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const { register, handleSubmit } = useForm<Record<string, string>>({
    resolver: yupResolver(Schema),
  });

  return (
    <form>
      {inputData.map((item, index) => (
        <TextField label={item.label} {...register(item.name)} />
      ))}
    </form>
  );
};

Task.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Task;
