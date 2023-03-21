import React from "react";
import { Pagination as PaginationAntd } from "antd";

export const Pagination = React.memo( (props) => {
    return (
        <PaginationAntd
            current={props.current}
            total={props.total}
            pageSize={props.pageSize || 10}
            onChange={p => props.onChange(p)}
            onShowSizeChange={(p,s) => props.onShowSizeChange(p,s)}
        />
    )
})