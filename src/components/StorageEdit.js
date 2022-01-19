import classNames from 'classnames';
import numeral from 'numeral';
import { useState } from 'react';
import { useMutationSetRawData, useQueryRawData } from '../data/queries';
import { formatIsoDate } from '../utils/date';
import LinkButton from './LinkButton';

export default function StorageEdit() {
	const { isLoading, isFetching, data: rawData } = useQueryRawData({ keepPreviousData: true });

	const setRawDataMutation = useMutationSetRawData();

	const [value, setValue] = useState(rawData);
	const [prevRawData, setPrevRawData] = useState(rawData);
	// if rawData is updated by restoring a file, update the textarea
	if (rawData !== prevRawData) {
		setValue(rawData);
		setPrevRawData(rawData);
	}

	const [showTextarea, setShowTextarea] = useState(false);

	if (isLoading) {
		return null;
	}

	const isDirty = value !== rawData;

	const handleToggleTextarea = () => {
		setShowTextarea(showTextarea => !showTextarea);
	};

	const handleChange = e => {
		setValue(e.target.value);
	};

	const handleSave = () => {
		setRawDataMutation.mutate(value);
	};

	const handleUpload = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json';
		input.addEventListener('change', () => {
			const reader = new FileReader();
			reader.onload = () => {
				setRawDataMutation.mutate(reader.result);
			};
			reader.readAsText(input.files[0]);
		}, { once: true });
		input.click();
	};

	const handleDownload = () => {
		const blob = new Blob([rawData], { type: 'application/json' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		const now = Date.now();
		a.download = `mediadb-backup-${formatIsoDate(now)}-${now}.json`;
		a.click();
	};

	return (
		<fieldset className="StorageEdit">
			<legend>
				<LinkButton
					className={classNames('StorageEdit-showTextarea', { 'StorageEdit-showTextarea--active': showTextarea })}
					onClick={handleToggleTextarea}
				>
					{'Edit raw storage'}
				</LinkButton>
				{' | '}
				<LinkButton
					disabled={isFetching}
					onClick={handleUpload}
				>
					{'Upload'}
				</LinkButton>
				{' | '}
				<LinkButton
					title={numeral(rawData.length).format('0.0 b')}
					disabled={isFetching}
					onClick={handleDownload}
				>
					{'Download'}
				</LinkButton>
				{showTextarea && isDirty &&
					<>
						{' | '}
						<LinkButton
							disabled={isFetching}
							onClick={handleSave}
						>
							{setRawDataMutation.isError &&
								<span title={setRawDataMutation.error.message}>{'❌'}</span>
							}
							{'Save'}
						</LinkButton>
					</>
				}
			</legend>
			{showTextarea &&
				<textarea
					className="StorageEdit-textarea"
					rows={32}
					value={value}
					onChange={handleChange}
				/>
			}
		</fieldset>
	);
}
