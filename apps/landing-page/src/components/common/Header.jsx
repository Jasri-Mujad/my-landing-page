import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'text-white' : 'text-text-secondary hover:text-white'
  }

  return (
    <header className="w-full border-b border-solid border-b-[#223149] bg-[#101723]/95 backdrop-blur sticky top-0 z-50">
      <div className="px-4 md:px-10 py-3 max-w-[1280px] mx-auto flex items-center justify-between whitespace-nowrap">
        <Link to="/" className="flex items-center gap-4 text-white cursor-pointer select-none">
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[32px]">terminal</span>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">DevPortfolio</h2>
        </Link>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <div className="flex items-center gap-9">
            <Link
              to="/"
              className={`transition-colors text-sm font-medium leading-normal ${isActive('/')}`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`transition-colors text-sm font-medium leading-normal ${isActive('/projects')}`}
            >
              Projects
            </Link>
            <Link
              to="#"
              className="text-text-secondary hover:text-white transition-colors text-sm font-medium leading-normal"
            >
              About
            </Link>
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary hover:bg-blue-600 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/20">
            <span className="truncate">Contact</span>
          </button>
        </div>
        <div className="flex md:hidden text-white">
          <span className="material-symbols-outlined cursor-pointer">menu</span>
        </div>
      </div>
    </header>
  )
}

export default Header
