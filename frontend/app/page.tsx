import { CreateUserForm } from '../forms/create-user.form';

export default function Index() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="flex flex-col w-1/4 p-6 shadow-md rounded-lg border gap-2">
        <h1 className="text-xl">Создание пользователя</h1>
        <CreateUserForm />
      </div>
    </div>
  );
}
