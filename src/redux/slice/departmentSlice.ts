import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { MAIN_URL } from '../../url/url'

interface DepartmentState {
	department: any[]
	loading: boolean
	error: string | null
}

const initialState: DepartmentState = {
	department: [],
	loading: false,
	error: null,
}

export const fetchDepartment = createAsyncThunk(
	'department/fetchDepartment',
	async () => {
		const response = await axios.get(`${MAIN_URL}/departments`)
		return response.data
	}
)

export const createDepartment = createAsyncThunk(
	'department/createDepartment',
	async (departmentData: any, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			const response = await axios.post(
				`${MAIN_URL}/department`,
				departmentData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return response.data
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data.message : error.message
			)
		}
	}
)

export const deleteDepartment = createAsyncThunk(
	'department/deleteDepartment',
	async (id: string, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}

			await axios.delete(`${MAIN_URL}/departments/${id}`, {
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

const DepartmentSlice = createSlice({
	name: 'department',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchDepartment.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(
				fetchDepartment.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					state.loading = false
					state.department = action.payload
				}
			)
			.addCase(fetchDepartment.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Something went wrong'
			})
			.addCase(createDepartment.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(
				createDepartment.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.loading = false
					state.department.push(action.payload)
				}
			)
			.addCase(createDepartment.rejected, (state, action) => {
				state.loading = false
				state.error = (action.payload as string) || 'Something went wrong'
			})
			.addCase(deleteDepartment.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(
				deleteDepartment.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.loading = false
					state.department = state.department.filter(
						division => division.id !== action.payload
					)
				}
			)
			.addCase(deleteDepartment.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Something went wrong'
			})
	},
})

export default DepartmentSlice.reducer
