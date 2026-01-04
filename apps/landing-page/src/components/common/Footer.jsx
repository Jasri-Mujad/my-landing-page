function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full border-t border-white/5 bg-[#0f1621] mt-auto">
            <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <span>© {currentYear} DevPortfolio. All rights reserved.</span>
                </div>
                <div className="flex items-center gap-6">
                    <a className="text-text-secondary hover:text-white transition-colors" href="#">
                        <span className="sr-only">GitHub</span>
                        <span className="material-symbols-outlined text-[20px]">code</span>
                    </a>
                    <a className="text-text-secondary hover:text-white transition-colors" href="#">
                        <span className="sr-only">Twitter</span>
                        <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                    </a>
                    <a className="text-text-secondary hover:text-white transition-colors" href="#">
                        <span className="sr-only">LinkedIn</span>
                        <span className="material-symbols-outlined text-[20px]">group</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
