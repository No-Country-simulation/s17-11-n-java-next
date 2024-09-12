import Filters from '@/components/filters/filters';
import TopbarGeneral from '@/components/containers/topbar-general';

export default function Resultados() {
    return (
        <><TopbarGeneral />
            <main className='w-full max-w-[1232px] mx-auto mt-10'>
                <Filters className='m-auto' />
            </main>
        </>
    );
}
