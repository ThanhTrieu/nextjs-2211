import { useRouter } from 'next/router';

export default function Index(){
    const router = useRouter();
    console.log(router.query.detail || 0);

    return (
        <h1> detail product</h1>
    )
}