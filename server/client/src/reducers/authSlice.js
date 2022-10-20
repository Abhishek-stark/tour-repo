import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { response } from 'express';
// import { response } from '../../../app';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));
// const tour = JSON.parse(localStorage.getItem('tour'));
// const tours = JSON.parse(localStorage.getItem('tours'));
const tourdetail = JSON.parse(localStorage.getItem('tourdetail'));

const initialState = {
    user: user ? user : null,
    // tours: tours ? tours : null,
    tourdetail: tourdetail ? tourdetail : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async(user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const WriteReview = createAsyncThunk(
    'auth/WriteReview',
    async(data, token, thunkAPI) => {
        try {
            return await authService.WriteReview(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllusers = createAsyncThunk(
    'auth/getAllusers',
    async(thunkAPI) => {
        try {
            return authService.getAllusers;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//book tour
// export const bookTour = createAsyncThunk(
//     'auth/bookTour',
//     async(tourId, thunkAPI) => {
//         try {
//             return await authService.bookTour(tourId);
//         } catch (error) {
//             const message =
//                 (error.response &&
//                     error.response.data &&
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// Login user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const update = createAsyncThunk(
    'auth/update',
    async(user, thunkAPI) => {
        try {
            return await authService.update(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async(user, thunkAPI) => {
        try {
            return await authService.updatePassword(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async(thunkAPI) => {
    try {
        await authService.logout();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// export const getTour = createAsyncThunk('auth/gettour', async(thunkAPI) => {
//     try {
//         await authService.getTour();
//     } catch (err) {
//         const message =
//             (err.response && err.response.data && err.response.data.message) ||
//             err.message ||
//             err.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// });
export const getOneTour = createAsyncThunk(
    'auth/getOneTour',
    async(slug, thunkAPI) => {
        try {
            await authService.getOneTour(slug);
        } catch (err) {
            const message =
                (err.responsee && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.tours = null;
            })
            .addCase(update.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(update.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.user = null;
                state.tourdetail = null;
                state.tours = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            // .addCase(getTour.pending, (state) => {
            //     state.isLoading = true;
            //     state.isSuccess = false;
            // })
            // .addCase(getTour.fulfilled, (state, action) => {
            //     state.isSuccess = true;
            //     state.isLoading = false;
            //     state.user = null;
            //     state.tours = action.payload;
            // })
            // .addCase(getTour.rejected, (state, action) => {
            //     state.isError = true;
            //     state.message = action.payload;
            //     state.tours = null;
            //     state.tourdetail = null;
            // })
            .addCase(getOneTour.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(getOneTour.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.user = null;
                state.tourdetail = action.payload;
            })
            .addCase(getOneTour.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.tourdetail = null;
            })
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(WriteReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(WriteReview.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                // state.user = action.payload;
            })
            .addCase(WriteReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllusers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllusers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getAllusers.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                // state.message = action.payload;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;