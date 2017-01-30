var express = require('express');
var config = {database: 'upsilon'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);


router.get('/',function(req,res){
  pool.connect(function(err,client,done){
    if(err){
      console.log('Error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
      client.query(
        'SELECT id,task,is_complete FROM task ORDER BY is_complete;'
        ,
        function(err,result){
          done();
          if(err){
            console.log('Error querying DB',err);
            res.sendStatus(500);
          } else {
            console.log('Posted info from DB',result.rows);
            res.send(result.rows);
          }
        });
      }
    });
  });//end of get


  router.post('/',function(req,res){
    // console.log('req.body::',req.body);
    pool.connect(function(err,client,done){
      if(err){
        console.log('Error connecting to DB',err);
        res.sendStatus(500);
        done();
      } else {

        client.query(
          'INSERT INTO task (task, is_complete) VALUES($1,$2) returning *;',
          [req.body.task, 0],
          function(err,result){
            done();
            if(err){
              console.log('Error querying DB',err);
              res.sendStatus(500);
            } else {
              console.log('Posted info from DB',result.rows);
              res.send(result.rows);
            }
          });
        }
      });
    });//end of post

    router.delete('/:id',function(req,res){
      pool.connect(function(err,client,done){
        if(err){
          console.log('Error connecting to DB',err);
          res.sendStatus(500);
          done();
        } else {
          console.log('paramId ::'+req.params.id);
          client.query(
            'DELETE FROM task WHERE id=$1;',
            [req.params.id],
            function(err,result){
              done();
              if(err){
                console.log('Error querying DB',err);
                res.sendStatus(500);
              } else {
                console.log('Posted info from DB',result.rows);
                res.send(result.rows);
              }
            });
          }
        });
      });//end of delete

      router.put('/:id',function(req,res){
        pool.connect(function(err,client,done){
          if(err){
            console.log('Error connecting to DB',err);
            res.sendStatus(500);
            done();
          } else {

            client.query(
              'UPDATE task SET is_complete=$2 WHERE id=$1 returning *;',
              [req.params.id, 1],
              function(err,result){
                done();
                if(err){
                  console.log('Error querying DB',err);
                  res.sendStatus(500);
                } else {
                  console.log('Posted info from DB',result.rows);
                  res.send(result.rows);
                }
              });
            }
          });
        });//end of post

        module.exports = router;
