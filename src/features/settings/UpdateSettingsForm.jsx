import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();

	const { isUpdating, updateSetting } = useUpdateSetting();

	const { register, handleSubmit, formState } = useForm();

	const { errors } = formState;

	function handleUpdate(data) {
		updateSetting({ ...data });
	}

	if (isLoading) return <Spinner />;

	return (
		<Form onSubmit={handleSubmit(handleUpdate)}>
			<FormRow
				label="Minimum nights/booking"
				error={errors?.minBookingLength?.message}>
				<Input
					type="number"
					id="minBookingLength"
					defaultValue={minBookingLength}
					disabled={isUpdating}
					{...register('minBookingLength', {
						required: 'This field is required.',
						validate: (value) => {
							if (value <= 0) {
								return `Minimum booking length should be 1 or more night(s)`;
							}
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum nights/booking"
				error={errors?.maxBookingLength?.message}>
				<Input
					type="number"
					id="maxBookingLength"
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					{...register('maxBookingLength', {
						required: 'This field is required.',
						validate: (value) => {
							if (value <= 0) {
								return `Maximum booking length should be 1 or more night(s)`;
							}
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum guests/booking"
				error={errors?.maxGuestsPerBooking?.message}>
				<Input
					type="number"
					id="maxGuestsPerBooking"
					defaultValue={maxGuestsPerBooking}
					disabled={isUpdating}
					{...register('maxGuestsPerBooking', {
						required: 'This field is required.',
						validate: (value) => {
							if (value <= 0) {
								return `Maximum guest per booking must be at least 1.`;
							}
						},
					})}
				/>
			</FormRow>

			<FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
				<Input
					type="number"
					id="breakfastPrice"
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					{...register('breakfastPrice', {
						required: 'This field is required.',
						validate: (value) => {
							if (value < 0) {
								return `Breakfast price must be a positive number.`;
							}
						},
					})}
				/>
			</FormRow>

			<FormRow>
				<Button disabled={isUpdating}>Save Settings</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
