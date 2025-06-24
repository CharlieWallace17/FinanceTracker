
import { Outlet, createRootRoute } from '@tanstack/react-router'

import { Menu } from 'components/Menu'

import '../index.css'


export const Route = createRootRoute({

  component: () => (
    <div className='!w-full !h-screen'>
      <div className='bg-green-200 max-w-min rounded-2xl border-2 mx-auto m-2 mb-10'>
        <div className='text-7xl font-bold text-emerald-500 font-serif drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] p-3 text-center min-w-max'>Finance Tracker</div>
      </div>
      <div className='grid grid-cols-12'>
        <Menu />
        <div className='col-span-11 col-start-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
})
