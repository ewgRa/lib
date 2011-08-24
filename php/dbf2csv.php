<?php
	$dbPath = $argv[1];

	$db = dbase_open($dbPath, 0);

	$recordNumbers = dbase_numrecords($db);

	$handle = fopen("php://output", 'w');

	for ($i = 1; $i <= $recordNumbers; $i++) {
		$row = dbase_get_record_with_names($db, $i);

		unset($row['deleted']);

		foreach ($row as &$value)
			$value = trim($value);

		fputcsv($handle, $row);
	}

	fclose($handle);
	dbase_close($db);
?>