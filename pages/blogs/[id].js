import { useRouter } from 'next/router';

export default function Index(){
    const router = useRouter();
    const id = router.query.id;

    return (
        <h1> ID Post : {id}</h1>
    )
}