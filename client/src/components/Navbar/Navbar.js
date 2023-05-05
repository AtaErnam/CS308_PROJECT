import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { useCart } from "../../contexts/CartContext";

function Navbar() {
	const { items, getTotalQuantity } = useCart();

	return (
		<nav className={styles.nav}>
			<div className={styles.left}>
				<div className={styles.logo}>
					<Link to="/">eCommerce</Link>
				</div>

				<ul className={styles.menu}>
					<li>
						<Link to="/">Products</Link>
					</li>
				</ul>
			</div>

			<div className={styles.right}>
				{
					<>
						<Link to="/signin">
							<Button colorScheme="blue">Login</Button>
						</Link>
						<Link to="/signup">
							<Button colorScheme="blue">Register</Button>
						</Link>
                        {items.length > 0 && (
							<Link to="/cart">
								<Button colorScheme="red" variant="outline">
									Cart ({getTotalQuantity()})
								</Button>
							</Link>
						)}
					</>
				}

			</div>
		</nav>
	);
}

export default Navbar;