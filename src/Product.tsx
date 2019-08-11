import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import { useDrag, DragSourceMonitor } from 'react-dnd'
import ItemTypes from './ItemTypes'


export interface ProductProps {
    name: string;
    price: number;
    img: string;
    stock:number;
    click():void;
    dark:boolean;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: "1rem",
            maxWidth: 500,
        },
        darkPaper:{
            padding: theme.spacing(2),
            margin: "1rem",
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

const style: React.CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'inherit',
  }

const Product: React.FC<ProductProps> = ({ name, price, img,stock, click, dark }) => {
    const classes = useStyles();
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.GUNS },
        end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
          const dropResult = monitor.getDropResult()
          if (item && dropResult) {
            click()
          }
        },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      })
      const opacity = isDragging ? 0.4 : 1
    return (
        <div ref={drag} className={classes.root}>
            <div style={{ ...style, opacity }}>
    
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
                            <Button variant="outlined" className={classes.button} onClick={click}>
                                Add to cart
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{price}$({stock} left in stock)</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </div>
        </div>)
}
export default Product;