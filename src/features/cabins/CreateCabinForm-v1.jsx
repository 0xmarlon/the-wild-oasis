import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

// const FormRow = styled.div`
// 	display: grid;
// 	align-items: center;
// 	grid-template-columns: 24rem 1fr 1.2fr;
// 	gap: 2.4rem;

// 	padding: 1.2rem 0;

// 	&:first-child {
// 		padding-top: 0;
// 	}

// 	&:last-child {
// 		padding-bottom: 0;
// 	}

// 	&:not(:last-child) {
// 		border-bottom: 1px solid var(--color-grey-100);
// 	}

// 	&:has(button) {
// 		display: flex;
// 		justify-content: flex-end;
// 		gap: 1.2rem;
// 	}
// `;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit }) {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { isSubmitting },
		formState,
	} = useForm();
	const { errors } = formState;

	const queryClient = useQueryClient();

	const { mutate, isLoading } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('New cabin successfully created.');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
			reset();
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	function onSubmit(data) {
		mutate({ ...data, image: data.image[0] });
	}

	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow
				label="Cabin name"
				disabled={isLoading}
				error={errors?.name?.message && <Error>{errors.name.message}</Error>}>
				<Input
					type="text"
					id="name"
					disabled={isLoading}
					{...register('name', { required: 'This field is required.' })}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				disabled={isLoading}
				error={
					errors?.maxCapacity?.message && (
						<Error>{errors.maxCapacity.message}</Error>
					)
				}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isLoading}
					{...register('maxCapacity', {
						required: 'This field is required.',
						min: {
							value: 1,
							message: 'The capacity must be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				disabled={isLoading}
				error={
					errors?.regularPrice?.message && (
						<Error>{errors.regularPrice.message}</Error>
					)
				}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isLoading}
					{...register('regularPrice', {
						required: 'This field is required.',
					})}
				/>
			</FormRow>

			<FormRow
				label="Discount"
				disabled={isLoading}
				error={
					errors?.discount?.message && <Error>{errors.discount.message}</Error>
				}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isLoading}
					{...register('discount', {
						required: 'This field is required.',
						validate: (value) => {
							const regularPrice = getValues('regularPrice'); // Access the regularPrice from form values
							if (value > regularPrice) {
								return 'Discount should be less than regular price.';
							}
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				disabled={isLoading}
				error={
					errors?.description?.message && (
						<Error>{errors.description.message}</Error>
					)
				}>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					disabled={isLoading}
					{...register('description', { required: 'This field is required.' })}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				<FileInput
					id="image"
					accept="image/*"
					{...register('image', { required: 'This field is required.' })}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isLoading}>
					{isLoading ? 'Adding the cabin...' : 'Add cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
