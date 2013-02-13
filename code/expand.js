/*
  Expand a ghost by flattening nested records

  Parameter:
    ghost - array, a single ghost in compact format received from the server

  Returns:
    array, the expanded ghost with a single array of nesting
    equivalent to the given ghost
*/
function expand( ghost ) {
  var
    FIRST_COMMON_FIELD = 4,
    LAST_COMMON_FIELD = 9,
    MAX_NESTING_DEPTH = LAST_COMMON_FIELD - FIRST_COMMON_FIELD + 1,
    depth = 1,
    recordsBefore = ghost.slice(FIRST_COMMON_FIELD),
    recordsAfter,
    i,
    length,
    currentRecord,
    currentRecordLength;

  // In the context of expand(), a value in a common field
  // can only be an integer number or a string; any value
  // with the type of object is thus treated like an array.
  function isArray( value ) {
    return typeof value === "object";
  }

  // for each depth from 1 to 6
  while ( depth <= MAX_NESTING_DEPTH ) {
    recordsAfter = [];

    // for each record at current step of the expansion
    for ( i = 0, length = recordsBefore.length; i < length; i++ ) {
      currentRecord = recordsBefore[i];

      if ( isArray( currentRecord[depth] ) ) {
        // expand nested records
        currentRecordLength = currentRecord.length;
        for ( j = depth; j < currentRecordLength; j++ ) {
          recordsAfter.push(
            currentRecord
              .slice( 0, depth )
              .concat( currentRecord[j] )
          );
        }
      } else {
        // copy record as is
        recordsAfter.push( currentRecord );
      }
    }

    recordsBefore = recordsAfter;
    depth++;
  }

  // copy top-level values followed with expanded records in resulting ghost
  return ghost.slice( 0, FIRST_COMMON_FIELD).concat( recordsAfter );
}
