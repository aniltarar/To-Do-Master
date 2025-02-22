import React, { use, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/slices/authSlice'

const Register = () => {

  const { register, watch, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const { status, message } = useSelector(state => state.auth)
  const navigate = useNavigate()



  const onRegister = (data) => {
    dispatch(registerUser(data))

  }

  useEffect(()=>{
    if(status === 'success'){
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }

  })



  return (
    <div className='flex flex-col w-full items-center justify-center  '>
      <div className='p-8 rounded-lg w-full md:w-1/2  lg:w-1/3 flex flex-col gap-y-4 ' >

        <div className='flex flex-col items-center gap-y-3 '>
          <h1 className='text-2xl font-bold'>Hesap Oluştur</h1>
          <p className='text-sm text-gray-500'>Hesabınız yok mu? Hemen kayıt olun.</p>
        </div>


        <form className='flex flex-col gap-y-5' onSubmit={handleSubmit(onRegister)}>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor="fullName">Adınız - Soyadınız</label>
            <input type="text" id='fullName' className='rounded-md border px-2 py-2.5 text-md' placeholder='Anıl Tarar' {...register('fullName', {
              required: { value: true, message: 'Alan boş bırakılamaz.' },
              minLength: { value: 2, message: 'Adınız en az 2 karakter olmalıdır' },
              maxLength: { value: 30, message: 'Adınız en fazla 30 karakter olmalıdır' },
              pattern: { value: /^[a-zA-Z\s]*$/, message: 'Adınız sadece harf ve boşluk içerebilir. Lütfen aykırı karakterleri kaldırınız.' }
            })} />
            {errors.fullName && <span className='text-pink-500 font-semibold text-sm'>{errors.fullName.message}</span>}
          </div>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor="email">Email Adresiniz</label>
            <input type="email" id='email' className='rounded-md border px-2 py-2.5 text-md' placeholder='adiniz@mail.com' {...register('email', {
              required: { value: true, message: 'Alan boş bırakılamaz.' },
              pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Geçerli bir email adresi giriniz.' }
            })} />
            {errors.email && <span className='text-pink-500 font-semibold text-sm'>{errors.email.message}</span>}
          </div>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor="password">Şifreniz</label>
            <input type="password" id='password' className='rounded-md border px-2 py-2.5 text-md' placeholder='En az 8 haneli şifreniz'  {...register('password', {
              required: { value: true, message: 'Alan boş bırakılamaz.' },
              minLength: { value: 8, message: 'Şifreniz en az 8 karakter olmalıdır' },
              maxLength: { value: 30, message: 'Şifreniz en fazla 30 karakter olmalıdır' }
            })} />
            {errors.password && <span className='text-pink-500 font-semibold text-sm'>{errors.password.message}</span>}
          </div>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor="passwordConfirm">Şifrenizi Tekrar Giriniz</label>
            <input type="password" id='passwordConfirm' className='rounded-md border px-2 py-2.5 text-md' placeholder='Şifrenizi tekrarlayınız'  {...register('passwordConfirm', {
              required: { value: true, message: 'Alan boş bırakılamaz.' },
              validate: value => value === watch('password') || 'Şifreler uyuşmuyor'

            })} />
            {errors.passwordConfirm && <span className='text-pink-500 font-semibold text-sm'>{errors.passwordConfirm.message}</span>}
          </div>



          <button type='submit' className='border text-white rounded-md px-4 py-2 hover:bg-white hover:text-black hover:cursor-pointer transition-colors'>Kayıt Ol</button>

          <Link to='/auth/login' className='text-center text-sm text-gray-500 hover:text-white hover:underline'>
            Hesabınız var mı? Giriş yapmak için tıklayın.
          </Link>

        </form>

      </div>
    </div>
  )
}

export default Register