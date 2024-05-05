import { Request, Response } from 'express';
import pool from '../database';


import moment from 'moment';
moment.updateLocale("es-mx", {
  week: {
    dow: 6, // First day of week is Saturday
    doy: 8 // First week of year must contain 1 January (7 + 6 - 1)
  }
});
const _f = 'YYYY-MM-DD'

class ProductsProduct {
    public async list(req: Request, res: Response): Promise<void> {
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query('SELECT p.*, um.codigo as uM, g.description as grupod, f.codigo as familia, f.descripcion as tipo FROM products p INNER JOIN unidades_medida um ON p.um = um.id INNER JOIN grupos g ON p.grupo = g.id LEFT JOIN familias f ON g.familia = f.id', function (error, results, fields) {
                var resR: JSON = results;
                // console.log(resR);

                res.json(resR);
                connection.release();
                if (error) throw error;
            });
        });
    }

    public async getTopProducts(req: Request, res: Response): Promise<void> {

        const {day, weekDesfase } = req.query
        // console.log(day);
        // console.log( moment(day?.toString()));
        // console.log( moment());
        // console.log( moment().subtract(6,'h'));
        
        
            const baseDate = moment(day?.toString()).subtract((Number(weekDesfase) || 0), 'weeks')
            const start = baseDate.startOf('week').format(_f), end = baseDate.endOf('week').format(_f);

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            const query = `SELECT
            p.*,
            SUM(itm.ventaPz) AS vendido
        FROM
            products p
        JOIN item_operacion itm ON
            p.code = itm.code
        JOIN operaciones ops ON
            ops.id = itm.operacion
        WHERE
            DATE(ops.date) BETWEEN '${start}' AND '${end}'
        GROUP BY
            p.code
        ORDER BY
            vendido
        DESC
        LIMIT 10;`
            connection.query(query, function (error, results, fields) {
                var resR: JSON = results;
                res.json(resR);
                connection.release();
                if (error) throw error;
            });
        });
    }

    public async create(req: Request, res: Response): Promise<void> {
        var obj = req.body;
     //  console.log('Objeto que viene del body: ' + obj);
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query('INSERT INTO `products` set ?', [obj], function (error, results, fields) {
             //  console.log('Consulta');
                res.json(results);
                connection.release();
                if (error) throw error;
            });
        });

    }
    public delete(req: Request, res: Response) {
        var id = req.params.id;
     //  console.log('Id del products a elliminar: ' + id);
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query('DELETE FROM `products` WHERE `code` = ?', id, function (error, results, fields) {
             //  console.log('Borra');
                res.json(results);
                connection.release();
                if (error) throw error;
            });
        });

    }

    public search(req: Request, res: Response) {
        var id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query('SELECT * FROM `products` where `code` = ?', id, function (error, results, fields) {
                var resR = results;
             //  console.log('busca');
                res.json(resR);
                connection.release();
                if (error) throw error;
            });
        });
    }
    public update(req: Request, res: Response) {
        var id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query('UPDATE `products` SET ? WHERE `code` = ?', [req.body, req.params.id], function (error, results, fields) {
                if (error) throw error;
                connection.query('SELECT * FROM `products` where `code` = ?', id, function (error2, results2, fields2) {
                    var resR = results2;
                 //  console.log('editado:');
                    res.json(resR);
                    connection.release();
                });
            });
        });
    }
}
const productsProduct = new ProductsProduct;
export default productsProduct;

// data: req.body['status'] ? 'Connected' : 'Updated'            