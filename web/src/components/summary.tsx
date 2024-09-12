import { CheckCircle2, Plus, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { getSummary } from '@/http/get-summary'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { PendingGoals } from './pending-goals'
import { deleteGoals } from '@/http/delete-goals'

dayjs.locale(ptBR)

export function Summary() {

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  async function handleDeleteGoals() {
    await deleteGoals()
    window.location.reload()
  }

  if (!data) {
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('DD MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('DD MMM')

  const completedPercentage = Math.round((data.completed * 100) / data.total)

  return (
    <div className='py-10 max-w-[400px] px-5 mx-auto flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <InOrbitIcon />
          <span className='text-lg font-semibold capitalize text-zinc-50'>
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <div className='space-y-3'>
          <DialogTrigger asChild>
            <Button size='sm'>
              <Plus className='size-4' /> Cadastrar Meta
            </Button>
          </DialogTrigger>
          <Button onClick={handleDeleteGoals} variant='secondary' size='sm'>
            <Trash2 className='size-4' /> Deletar Metas
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <Progress max={15} value={8}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
        <div className='flex items-center justify-between text-xs text-zinc-400'>
          <span>
            Você completou{' '}
            <span className='text-zinc-100'>{data?.completed}</span> de{' '}
            <span className='text-zinc-100'>{data?.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>
      <Separator />
      <PendingGoals />
      <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-medium text-zinc-100'>Sua semana</h2>

        {data.goalsPerDay &&
          Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const formattedDate = dayjs(date).format('D [de] MMMM')

            return (
              <div key={date} className='flex flex-col gap-4'>
                <h3 className='font-medium'>
                  <span className='capitalize text-zinc-50'>{weekDay}</span>
                  <span className='text-xs text-zinc-400'>
                    ({formattedDate})
                  </span>
                </h3>
                <ul className='flex flex-col gap-3'>
                  {goals.map(goal => {
                    const time = dayjs(goal.completedAt).format('HH:mm')

                    return (
                      <li key={goal.id} className='flex items-center gap-2'>
                        <CheckCircle2 className='size-4 text-pink-500' />
                        <span className='text-sm text-zinc-400'>
                          Você completou{' '}
                          <span className='text-zinc-100'>{goal.title}</span> as{' '}
                          <span className='text-zinc-100'>{time}h</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
      </div>
    </div>
  )
}
