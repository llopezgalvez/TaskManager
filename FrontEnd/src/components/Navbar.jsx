import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 mb-10'>
            <Link to='/'>
                <h1 className="text-2xl font-bold">ToDoProduct</h1>
            </Link>
            <ul className="flex gap-x-7">
                <li>
                    <Link to='/AddTask'>Add Task</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
            </ul>
        </nav>
    )
}
