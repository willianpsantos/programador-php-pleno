<?php

namespace App\Repositories\Interfaces;

interface IRepository {
    function save($values);
    function massUpdate($filters, $updates);
    function delete($id);
    function massDelete($filters);
    function activate($id);
    function inactivate($id);
    function approve($id);
    function disapprove($id, $negative, $reason);
    function getAll($with = null, $columns = null);
    function getAllWithOrderBy($orderBy, $with = null, $columns = null);
    function getAllWithPagination($page, $take, $with = null, $columns = null);
    function getAllWithPaginationAndOrderBy($orderBy, $page, $take, $with = null, $columns = null);
    function getById($id, $with = null, $columns = null);
    function filter($filters, $with = null, $columns = null);
    function filterWithOrderBy($filters, $orderBy, $with = null, $columns = null);
    function filterWithPagination($filters, $page, $take, $with = null, $columns = null);
    function filterWithPaginationAndOrderBy($filters, $orderBy, $page, $take, $with = null, $columns = null);
    function toSql();
}
