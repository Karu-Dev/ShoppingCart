import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button,Paper,ButtonBase } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: '1rem',
            maxWidth: 500,
        },
        darkPaper: {
            padding: theme.spacing(2),
            margin: '1rem',
            maxWidth: 500,
            color:"white",
            backgroundColor:"gray"
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        button: {
            margin: theme.spacing(1),
          },
    }),
);
interface Selected {
    name: string,
    quantity: number;
    img:string;
    dark:boolean;
    free:number;
    onRemove(): void
}

const SelectedItems: React.FC<Selected> = ({ name, quantity,img,dark,free,onRemove }) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Paper className={dark?classes.paper:classes.darkPaper}>
                <Grid container spacing={2}>
                <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt={name} src={img} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {"Pepega item very good skin yes"}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {"someRandomIDidkwhat"}
                                </Typography>
                            </Grid>
                            <Grid item>
                            <Button variant="outlined" className={classes.button} onClick={onRemove}>
                                Add to cart
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{quantity} pcs.({free} free!)</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>)
}
export default SelectedItems