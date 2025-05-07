import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
	return (
		<nav className={`${styles.staffPicksProNav} shadow-sm`}>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-10 h-16">
					<Link to="/" className="flex items-center">
						<div className="flex items-center">
							<div className={`${styles.logoFrame} flex`}>
								<div>
									<img
										src="/edelweiss-logo-text.png"
										alt="StaffPicksPro"
										className={styles.edelweissTextImage}
									/>
									<div className={styles.appName}>
										<span>Staff Picks Pro</span>
									</div>
								</div>
								<img
									src="/edelweiss-logo-icon.png"
									alt="Logo"
									className={styles.edelweissLogoImage}
								/>
							</div>
						</div>
					</Link>
					<div className="flex items-center space-x-4">
						<Link
							to="/home"
							className="text-brand-white hover:underline">
							Home
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
