import { ChangeEvent, FC, useState } from 'react'

export const ImageUploader: FC = () => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			const reader = new FileReader()

			reader.onload = (e: ProgressEvent<FileReader>) => {
				setSelectedImage(e.target?.result as string)
			}

			reader.readAsDataURL(file)
		}
	}

	return (
		<div>
			<input
				type='file'
				placeholder='Upload files'
				accept='image/png,image/jpeg'
				onChange={handleImageChange}
			/>
			{selectedImage && (
				<div>
					<img
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							objectFit: 'cover',
							height: '100%',
							width: '100%',
						}}
						src={selectedImage}
						alt='Selected'
						// style={{ marginTop: '20px', maxWidth: '100%', maxHeight: '300px' }}
					/>
				</div>
			)}
		</div>
	)
}
