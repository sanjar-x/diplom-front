import { ScrollArea, Table } from '@mantine/core'
import cx from 'clsx'
import { FC, useState } from 'react'
import styles from './SimpleTable.module.css'

interface ITableProps {
	style?: string
	tableData: {
		title: string
		values: (string | JSX.Element)[]
		width?: string
	}[]
	// setClick: Dispatch<SetStateAction<string | null>>
}

export const SimpleTable: FC<ITableProps> = ({
	style,
	tableData,
	// setClick,
}) => {
	const maxLength = Math.max(...tableData.map(item => item.values.length))

	const [scrolled, setScrolled] = useState<boolean>(false)
	return (
		<ScrollArea
			h={'100dvh'}
			onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
		>
			<Table
				striped
				highlightOnHover
				withTableBorder
				withColumnBorders
				style={{ width: style && style }}
			>
				<Table.Thead
					className={cx(styles.header, { [styles.scrolled]: scrolled })}
				>
					<Table.Tr>
						<Table.Th w={70} style={{ textAlign: 'center' }}>
							N&
						</Table.Th>
						{tableData.map((el, inx) => (
							<Table.Th key={inx} style={{ textAlign: 'center' }}>
								{el.title}
							</Table.Th>
						))}
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{Array.from({ length: maxLength }).map((_, rowIndex) => (
						<Table.Tr style={{ textAlign: 'center' }} key={rowIndex}>
							<Table.Td>{rowIndex + 1}</Table.Td> {/* Display the row count */}
							{tableData.map((col, colIndex) => (
								<Table.Td width={col?.width} key={colIndex}>
									{col.values[rowIndex] || ''}
								</Table.Td>
							))}
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</ScrollArea>
	)
}
