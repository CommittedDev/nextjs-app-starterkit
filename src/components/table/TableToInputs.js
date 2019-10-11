import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { renderValueType, handleInputChange } from './utils'
import TableTitle from 'src/components/table/TableTitle'
import HeaderCols from 'src/components/table/HeaderCols'
import NoDataTableCell from 'src/components/table/NoDataTableCell'
import WaterAnalysisTitle from 'src/components/table/WaterAnalysisTitle'
import PropTypes from 'prop-types';
import connect from './connect'
import { TYPES } from 'src/components/data'

const useStyles = makeStyles(theme => ({
    root: {
        // width: '100%',
        // marginTop: theme.spacing(3),
        // overflowX: 'auto',
    },
    table: {
        // width: 600,
    },
    tableTitle: {
        fontSize: 20
    },
    TableRow: {
        // backgroundColor:'red',

    },
    TableCell: {
        padding: '2em 2em !important'
    },
    TableInput: {
        // display: 'flex'
    },
    textFieldUNEditable: {
        background: 'lightblue'
    }
}));

function SimpleTable(props) {
    const { data, headerCols, tableTitle, tablesData, waterAnalysisTitle, actions } = props
    const { updateTablesValues } = actions
    const classes = useStyles();
    const tableValues = tablesData
    const renderTableData = () => {
        if (!data) return <NoDataTableCell className={classes.TableCell} />
        return data.map((row, i) => {
            return <TableRow key={i} className={classes.TableRow}>
                <TableCell align="left" className={`${classes.TableCell} row-text`}>
                    {row.name}
                </TableCell>

                {/* {row.units &&
                    <TableCell align="left">
                        {row.units}
                    </TableCell>} */}

                {row.fields && row.fields.map((field) => {
                    return <TableCell key={field.location} align="right" className={classes.TableCell}>
                        {row.units && field.type !==TYPES.SELECT && <div className='table-units' style={{ textAlign: 'right' }}>
                            {tablesData[field.location]} {row.units}
                        </div>}

                        {renderValueType(field, updateTablesValues, tableValues, classes, onBlur, onFocus)}
                        {/* {field.isMandatory && <div style={{ color: 'red' }}>***</div>} */}

                    </TableCell>
                })
                }
            </TableRow >
        })
    }
    const onFocus = () => {
        console.log('!!onFocus');
    }
    const onBlur = () => {
        console.log('!!onBlur');
    }
    return (
        <div className='table'>
            <div className='table__title' style={{ marginBottom: '1em' }}>Mechanical Properties</div>
            <Paper className={`${classes.root}`}>

                <Table className={classes.table}>
                    {/* <TableHead> */}
                    {/* {tableTitle && <TableTitle className={classes.tableTitle} tableTitle={tableTitle} />} */}
                    {/* happens only in Water Analysis table */}
                    {/* {waterAnalysisTitle
                        && <WaterAnalysisTitle value={tableValues['e30']}
                        handleInputChange={(e) => handleInputChange(e, updateTablesValues, tableValues)} />} */}
                    {/* ---- */}
                    {/* {headerCols && <HeaderCols data={headerCols} />} */}
                    {/* </TableHead> */}

                    <TableBody>
                        {renderTableData()}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

SimpleTable.defaultProps = {
    data: [],
    headerCols: [],
};

SimpleTable.propTypes = {
    data: PropTypes.array,
    headerCols: PropTypes.array,
    tablesData: PropTypes.object,
    tableTitle: PropTypes.string,
    waterAnalysisTitle: PropTypes.bool,
};

export default connect(SimpleTable)