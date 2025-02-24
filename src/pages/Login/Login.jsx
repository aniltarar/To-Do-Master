import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../redux/slices/authSlice'

const Login = () => {


  const { register, handleSubmit, formState: { errors } } = useForm()

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { status, message } = useSelector(state => state.auth)

  const handleLogin = (data) => {
    dispatch(loginUser(data));
  }

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [status])


  return (
    <div className='flex flex-col w-full items-center justify-center'>

      <div className='p-8 rounded-lg w-full md:w-1/2  lg:w-1/3 flex flex-col gap-y-4  ' >

        <div className='flex flex-col items-center gap-y-3 '>
          <h1 className='text-2xl font-bold'>Giriş Yap</h1>
          <p className='text-sm text-gray-500'>Hesabınız yok mu? Hemen kayıt olun.</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-y-4 p-5 outline rounded-md'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor="email">E-posta Adresiniz</label>
            <input type="email" id='email' className='rounded-md outline-1 px-2 py-2.5 text-md' placeholder='name@mail.com' {...register("email", {
              required: { value: true, message: 'Alan boş bırakılamaz.' },
              pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Geçerli bir email adresi giriniz.' }
            })} />
            {errors.email && <span className='text-pink-500 font-semibold text-sm'>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col gap-y-2'>

            <label htmlFor="password">Şifreniz</label>
            <input type="password" id='password' className='rounded-md outline-1 px-2 py-2.5 text-md' placeholder='Şifrenizi giriniz.'{...register("password", {
              required: { value: true, message: 'Alan boş bırakılamaz.' },
              minLength: { value: 8, message: 'Şifreniz en az 8 karakter olmalıdır' },
              maxLength: { value: 30, message: 'Şifreniz en fazla 30 karakter olmalıdır' }
            })} />
            {errors.password && <span className='text-pink-500 font-semibold text-sm'>{errors.password.message}</span>}
          </div>


          <button type='submit' className='outline-1 mt-3 bg-white text-black rounded-md px-4 py-2 hover:bg-black hover:text-white hover:cursor-pointer transition-colors'>Giriş Yap</button>

          <Link to='/auth/register' className='text-center text-sm text-gray-500 hover:text-white hover:underline'>
            Hesabınız yok mu? Kayıt olmak için tıklayın
          </Link>



        </form>

      </div>



    </div>
  )
}

export default Login