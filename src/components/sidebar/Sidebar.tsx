import { ScrollArea } from '@mantine/core'
import { ReactNode } from 'react'
import classes from './Saidbar.module.css'
import { LinksGroup } from './navbarLinkGroup/NavbarLinkGroup'
import { mockdata } from './sidebarData'

interface ComponentChildren {
	children: ReactNode
}

export function Sidebar({ children }: ComponentChildren) {
	const links = mockdata.map(item => <LinksGroup {...item} key={item.label} />)

	return (
		<div className={classes.layout}>
			<div className={classes.space}>
				<nav className={classes.navbar}>
					<ScrollArea className={classes.links}>
						<div className={classes.linksInner}>{links}</div>
					</ScrollArea>
				</nav>
			</div>
			<div className={classes.content}>{children}</div>
		</div>
	)
}
