import { Autocomplete, rem } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { FC } from 'react'
interface ISearchInput {
	searchData: string[]
}
export const SearchInput: FC<ISearchInput> = ({ searchData }) => {
	return (
		<Autocomplete
			placeholder='Search'
			leftSection={
				<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
			}
			data={searchData}
		/>
	)
}
