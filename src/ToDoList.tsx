import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password match error" },
        { shouldFocus: true }
      );
    }
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "write here",
            validate: {
              noJune: (value) =>
                value.includes("june") ? "No Junes allowed" : true,
              noCarl: (value) =>
                value.includes("carl") ? "no Carl allowed" : true,
            },
          })}
        />

        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>

        <input
          {...register("username", { required: "write here", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>

        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>

        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>

        <button>Add</button>
        <span>{errors.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
