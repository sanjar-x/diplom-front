import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { MAIN_URL } from '../../url/url'

interface DivisionState {
	devision: any[]
	loading: boolean
	error: string | null
}

const initialState: DivisionState = {
	devision: [],
	loading: false,
	error: null,
}

export const fetchDivisions = createAsyncThunk(
	'divisions/fetchDivisions',
	async () => {
		const response = await axios.get(`${MAIN_URL}/divisions`)
		return response.data
	}
)

export const createDivision = createAsyncThunk(
	'divisions/createDivision',
	async (divisionData: any, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.post(`${MAIN_URL}/division`, divisionData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data.message : error.message
			)
		}
	}
)

export const deleteDivision = createAsyncThunk(
	'divisions/deleteDivision',
	async (id: string, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}

			await axios.delete(`${MAIN_URL}/divisions/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return id
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data.message : error.message
			)
		}
	}
)

const divisionSlice = createSlice({
	name: 'division',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchDivisions.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(
				fetchDivisions.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					state.loading = false
					state.devision = action.payload
				}
			)
			.addCase(fetchDivisions.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Something went wrong'
			})
			.addCase(createDivision.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(
				createDivision.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.loading = false
					state.devision.push(action.payload)
				}
			)
			.addCase(createDivision.rejected, (state, action) => {
				state.loading = false
				state.error = (action.payload as string) || 'Something went wrong'
			})
			.addCase(deleteDivision.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(
				deleteDivision.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.loading = false
					state.devision = state.devision.filter(
						division => division.id !== action.payload
					)
				}
			)
			.addCase(deleteDivision.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Something went wrong'
			})
	},
})

export default divisionSlice.reducer
