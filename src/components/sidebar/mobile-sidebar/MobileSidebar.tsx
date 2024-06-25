import { Stack, Tooltip, UnstyledButton, rem } from '@mantine/core'
import {
	Icon2fa,
	IconBellRinging,
	IconDatabaseImport,
	IconFingerprint,
	IconKey,
	IconLogout,
	IconReceipt2,
	IconSettings,
} from '@tabler/icons-react'
import { useState } from 'react'
import classes from './MobileSidebar.module.css'

interface NavbarLinkProps {
	icon: typeof IconBellRinging
	label: string
	active?: boolean
	onClick?(): void
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
	return (
		<Tooltip label={label} position='right' transitionProps={{ duration: 0 }}>
			<UnstyledButton
				onClick={onClick}
				className={classes.link}
				data-active={active || undefined}
			>
				<Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	)
}

const mockdata = [
	{ icon: IconBellRinging, label: 'Home' },
	{ icon: IconReceipt2, label: 'Dashboard' },
	{ icon: IconFingerprint, label: 'Analytics' },
	{ icon: IconKey, label: 'Releases' },
	{ icon: IconDatabaseImport, label: 'Account' },
	{ icon: Icon2fa, label: 'Security' },
	{ icon: IconSettings, label: 'Settings' },
]

export function MobileSidebar() {
	const [active, setActive] = useState(2)

	const links = mockdata.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	))

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>
				<Stack justify='center' gap={0}>
					{links}
				</Stack>
			</div>

			<Stack justify='center' gap={0}>
				<NavbarLink icon={IconLogout} label='Logout' />
			</Stack>
		</nav>
	)
}
