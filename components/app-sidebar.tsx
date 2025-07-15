'use client'

import { cn } from '@/lib/utils'
import {
  Home,
  Users,
  Package,
  Settings,
  LayoutDashboard,
  BarChart2
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar'
import { SidebarToggleButton } from './sidebar-toggle-button'

/* -------------------------------------------------------------
 * NUEVA RUTA AÑADIDA:
 *  - title: "Dashboard"
 *  - icon : LayoutDashboard
 *  - url  : "/dashboard"
 * ------------------------------------------------------------ */
const mainNavigation = [
  { title: 'Inicio', icon: Home, url: '/', isActive: true },
  { title: 'Usuarios', icon: Users, url: 'usuarios' },
  { title: 'Contratos', icon: Package, url: 'contratos' },
  { title: 'Dashboard', icon: LayoutDashboard, url: '/dashboard' },
  { title: 'Trial Page', icon: BarChart2, url: '/trialpage' } // 👈 nuevo elemento
]

export function AppSidebar() {
  const { state, isMobile } = useSidebar()

  return (
    <Sidebar collapsible='icon' className='bg-[#1E293B] text-white'>
      {/* ---------- CONTENIDO PRINCIPAL ---------- */}
      <SidebarContent className='bg-[#1E293B]'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a
                      href={item.url}
                      className={cn(
                        'flex items-center justify-start gap-2',
                        'transition-[width,padding] duration-200 ease-linear',
                        state === 'collapsed' && !isMobile
                          ? 'w-[--sidebar-width-icon] px-2 overflow-hidden'
                          : 'w-full px-2',
                        state === 'collapsed' &&
                          !isMobile &&
                          'group-hover:w-full group-hover:px-2'
                      )}
                    >
                      <item.icon className='size-4 shrink-0 text-white' />
                      <span
                        className={cn(
                          'whitespace-nowrap text-white',
                          'transition-[max-width,opacity] duration-200 ease-linear',
                          state === 'collapsed' && !isMobile
                            ? 'max-w-0 opacity-0'
                            : 'max-w-[200px] opacity-100',
                          state === 'collapsed' &&
                            !isMobile &&
                            'group-hover:max-w-[200px] group-hover:opacity-100'
                        )}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ---------- FOOTER ---------- */}
      <SidebarFooter className='bg-[#1E293B]'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href='#'
                className={cn(
                  'flex items-center justify-start gap-2',
                  'transition-[width,padding] duration-200 ease-linear',
                  state === 'collapsed' && !isMobile
                    ? 'w-[--sidebar-width-icon] px-2 overflow-hidden'
                    : 'w-full px-2',
                  state === 'collapsed' &&
                    !isMobile &&
                    'group-hover:w-full group-hover:px-2'
                )}
              >
                <Settings className='size-4 shrink-0 text-white' />
                <span
                  className={cn(
                    'whitespace-nowrap text-white',
                    'transition-[max-width,opacity] duration-200 ease-linear',
                    state === 'collapsed' && !isMobile
                      ? 'max-w-0 opacity-0'
                      : 'max-w-[200px] opacity-100',
                    state === 'collapsed' &&
                      !isMobile &&
                      'group-hover:max-w-[200px] group-hover:opacity-100'
                  )}
                >
                  Avanzadi
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* ---------- BOTÓN DE COLAPSO ---------- */}
      <SidebarToggleButton />
    </Sidebar>
  )
}
